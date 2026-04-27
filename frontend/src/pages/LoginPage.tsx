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
      <div>
        <h1>ログイン</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
  placeholder="メールアドレス" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
   placeholder="パスワード" />
          <button type="submit">ログイン</button>
        </form>
        <Link to="/signup">アカウント登録</Link>
      </div>
    )
  }