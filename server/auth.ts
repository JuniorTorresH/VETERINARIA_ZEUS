import { Express } from "express";
import session from "express-session";
import { storage } from "./storage.js";
import { User } from "../shared/schema.js";
import { supabase } from "./db.js";

export function setupAuth(app: Express) {
    const sessionSettings: session.SessionOptions = {
        secret: process.env.SESSION_SECRET || "veterinaria_super_secret_key",
        resave: false,
        saveUninitialized: false,
        store: storage.sessionStore,
        rolling: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            secure: app.get("env") === "production",
        },
    };

    if (app.get("env") === "production") {
        app.set("trust proxy", 1);
    }

    app.use(session(sessionSettings));

    // Custom middleware to handle user in request
    app.use(async (req, res, next) => {
        if (req.session && (req.session as any).userId) {
            try {
                const user = await storage.getUser((req.session as any).userId);
                (req as any).user = user;
            } catch (err) {
                console.error("Session user retrieval error:", err);
            }
        }
        (req as any).isAuthenticated = () => !!(req as any).user;
        next();
    });

    app.post("/api/register", async (req, res) => {
        try {
            const { username, password, email, phone, role } = req.body;
            console.log(`Registration attempt for email: ${email}`);

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                console.error("Supabase signUp error:", error);
                return res.status(error.status || 400).json({ message: error.message });
            }

            if (!data.user) {
                return res.status(400).json({ message: "Error al crear el usuario" });
            }

            // Insert into public.users table (Sync with Supabase Auth)
            // Fix: Check if user already exists to avoid PK conflict
            const existing = await storage.getUser(data.user.id);
            if (!existing) {
                await storage.createUser({
                    id: data.user.id,
                    username,
                    password,
                    email,
                    phone,
                    role: role || "user"
                });
            }


            const user = await storage.getUser(data.user.id);
            (req.session as any).userId = data.user.id;
            res.status(201).json(user);
        } catch (err) {
            console.error("Registration error:", err);
            res.status(500).json({ message: "Error interno en el registro" });
        }
    });

    app.post("/api/login", async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(`Login attempt for email: ${email}`);

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.log("Authentication failed:", error.message);
                return res.status(401).json({ message: "Credenciales inválidas" });
            }

            if (!data.user) {
                return res.status(401).json({ message: "Usuario no encontrado" });
            }

            const user = await storage.getUser(data.user.id);
            if (!user) {
                return res.status(401).json({ message: "Perfil de usuario no encontrado" });
            }

            (req.session as any).userId = data.user.id;
            console.log(`Login successful for user: ${user.username}`);
            return res.status(200).json(user);
        } catch (err) {
            console.error("Login error:", err);
            res.status(500).json({ message: "Error interno en el login" });
        }
    });

    app.post("/api/logout", (req, res) => {
        req.session.destroy((err) => {
            if (err) return res.status(500).send("Error al cerrar sesión");
            res.sendStatus(200);
        });
    });

    app.get("/api/user", (req, res) => {
        if (!(req as any).isAuthenticated()) return res.sendStatus(401);
        res.json((req as any).user);
    });
}

