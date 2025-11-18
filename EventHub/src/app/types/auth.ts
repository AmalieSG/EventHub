
import type { SafeUser, Session } from "@/db/schema";

export interface AuthContext {
  user: SafeUser | null;
  session: Session | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
}