import { getAllUsers } from "./usersRepository" 
import type { User } from "@/app/types/user" 

export async function fetchAllUsers(): Promise<User[]> {
  return getAllUsers()
}
