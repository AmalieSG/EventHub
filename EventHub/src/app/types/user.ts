export interface User {
  readonly id: number
  firstName: string
  lastName: string
  username: string
  email: string
  city?: string
  country?: string
  phoneNumber?: string
  passwordHash?: string 
  profilePicture?: string
  createdAt: string
  updatedAt?: string
  role: "user" | "admin"
}

