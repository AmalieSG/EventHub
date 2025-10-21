import { users } from "@/app/data/users" 
import type { User } from "@/app/types/user" 

export async function getAllUsers(): Promise<User[]> {
  return users
}
