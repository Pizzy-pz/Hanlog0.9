import { createContext, useState, useEffect, ReactNode } from 'react'
  import type { User } from '../types'

  type AuthContextType = {
    user: User | null
    token: string | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
  }

  export const AuthContext = createContext<AuthContextType | null>(null)

  export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // TODO(human): ここに実装を書く

    return (
      <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
        {children}
      </AuthContext.Provider>
    )
  }