import { users, appointments, type User, type InsertUser, type Appointment, type AppointmentInsert } from "../shared/schema.js";
import { db, pool } from "./db.js";
import { eq, or } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Appointment methods
  createAppointment(appointment: AppointmentInsert): Promise<Appointment>;

  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    console.log("Initializing PostgresSessionStore...");
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      console.log(`Querying user by id: ${id}`);
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error(`Error in getUser(${id}):`, error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      console.log(`Querying user by username/email: ${username}`);
      const [user] = await db.select().from(users).where(or(eq(users.username, username), eq(users.email, username)));
      return user;
    } catch (error) {
      console.error(`Error in getUserByUsername(${username}):`, error);
      throw error;
    }
  }

  async createUser(insertUser: any): Promise<User> {
    try {
      console.log(`Inserting new user: ${insertUser.username}`);
      const [user] = await db.insert(users).values(insertUser).returning();
      return user;
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error;
    }
  }

  async createAppointment(insertAppointment: AppointmentInsert): Promise<Appointment> {
    try {
      console.log("Inserting new appointment...");
      const [appointment] = await db.insert(appointments).values(insertAppointment).returning();
      return appointment;
    } catch (error) {
      console.error("Error in createAppointment:", error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();


