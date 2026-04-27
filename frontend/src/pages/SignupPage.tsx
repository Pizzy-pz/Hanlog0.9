import { signup as signupApi } from '../api/auth'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'                                                                                       

  export default function SignupPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        const res = await signupApi(email, password)
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        navigate('/vocabularies')
      } catch {
        setError('登録に失敗しました')
      }
    }

    return (
      <div>
        <h1>アカウント登録</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
  placeholder="メールアドレス" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
   placeholder="パスワード" />
          <button type="submit">アカウント登録</button>
        </form>
        <Link to="/login">すでにアカウントをお持ちの方</Link>
      </div>
    )
  }