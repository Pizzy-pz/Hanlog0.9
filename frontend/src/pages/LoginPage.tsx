import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'                                       
import { useAuth } from '../hooks/useAuth'                                                 

  export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        await login(email, password)
        navigate('/vocabularies')
      } catch {
        setError('メールアドレスまたはパスワードが違います')
      }
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br
    from-blue-500 to-purple-600">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">ログイン</h1>      
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="メールアドレス"
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none  
    py-2 mb-6 text-gray-700"
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="パスワード"
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none  
    py-2 mb-6 text-gray-700"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3   
    rounded-xl font-semibold hover:opacity-90 transition"
            >
              ログイン
            </button>
          </form>
          <p className="text-center mt-4 text-gray-500 text-sm">
            <Link to="/signup" className="text-blue-500 hover:underline">アカウント登録</Link> 
          </p>
        </div>
      </div>
    )
  }