import request from './client'                                                             
import type { User } from '../types'                                                                                                                                                    
type AuthResponse = {                                                                      
  token: string 
  user: User
}

export function login(email: string, password: string) {
  return request<AuthResponse>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function signup(email: string, password: string) {
  return request<AuthResponse>('/api/v1/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ user: { email, password } }),
  })
}