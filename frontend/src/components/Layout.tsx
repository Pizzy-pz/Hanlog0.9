import { Link } from 'react-router-dom'                                                                   
  import { useAuth } from '../hooks/useAuth'
  import type { ReactNode } from 'react'

  export default function Layout({ children }: { children: ReactNode }) {
    const { user, logout } = useAuth()

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        <header className="bg-white/20 backdrop-blur-sm border-b border-white/30">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/vocabularies" className="text-white font-bold text-xl">🇰🇷 韓国語学習</Link>        
            {user && (
              <nav className="flex items-center gap-4">
                <Link to="/vocabularies" className="text-white hover:text-white/80">単語帳</Link>
                <Link to="/flashcard" className="text-white hover:text-white/80">学習</Link>
                <button onClick={logout} className="text-white/80 hover:text-white
  text-sm">ログアウト</button>
              </nav>
            )}
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    )
  }