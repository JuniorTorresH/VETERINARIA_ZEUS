import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { insertAppointmentSchema } from "../shared/schema.js";
import { z } from "zod";
import { supabase } from "./db.js";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

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

      // Sync with users table
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

  app.post("/api/appointments", async (req, res) => {
    if (!(req as any).isAuthenticated()) {
      return res.status(401).json({ message: "Debes iniciar sesión para agendar una cita" });
    }

    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);

      const appointment = await storage.createAppointment({
        ...appointmentData,
        userId: (req as any).user.id,
      });
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      } else {
        console.error("Error creating appointment:", error);
        res.status(500).json({ message: "Error al guardar la cita" });
      }
    }
  });

  return httpServer;
}


