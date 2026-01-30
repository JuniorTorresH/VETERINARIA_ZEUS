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
        (req as any).isAuthenticated = () => !!(req as any).user;

        if (req.session && (req.session as any).userId) {
            try {
                const user = await storage.getUser((req.session as any).userId);
                if (user) {
                    (req as any).user = user;
                } else {
                    console.log(`No user found for session userId: ${(req.session as any).userId}`);
                    delete (req.session as any).userId;
                }
            } catch (err) {
                console.error("Session user retrieval error:", err);
            }
        }
        next();
    });

}


