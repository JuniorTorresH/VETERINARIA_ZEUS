import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Using text for Supabase Auth UUIDs
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  password: text("password"), // Can be null for Supabase auth users
  role: text("role").notNull().default("user"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  id: true,
  username: true,
  email: true,
  phone: true,
  role: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").references(() => users.id).notNull(),
  nombreMascota: text("nombre_mascota").notNull(),
  servicio: text("servicio").notNull(),
  fecha: text("fecha").notNull(),
  hora: text("hora").notNull(),
  mensaje: text("mensaje"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const insertAppointmentSchema = createInsertSchema(appointments).pick({
  nombreMascota: true,
  servicio: true,
  fecha: true,
  hora: true,
  mensaje: true,
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;
export type AppointmentInsert = typeof appointments.$inferInsert;



