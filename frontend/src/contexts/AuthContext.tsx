import { login as loginApi } from '../api/auth'
import { createContext, useState, useEffect, } from 'react'
import type{ ReactNode } from 'react'
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
    useEffect(() => {                                                                          
        const savedToken = localStorage.getItem('token')
        if (savedToken) {
          setToken(savedToken)
          // user情報もlocalStorageに保存しておく必要がある
          const savedUser = localStorage.getItem('user')
          if (savedUser) setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)  // ← 必ずここで false にする
      }, [])

    const login = async (email: string, password: string) => {
        const res = await loginApi(email, password)  // auth.tsのloginを呼ぶ
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        setToken(res.token)
        setUser(res.user)
      }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
      }

    return (
      <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
        {children}
      </AuthContext.Provider>
    )
  }