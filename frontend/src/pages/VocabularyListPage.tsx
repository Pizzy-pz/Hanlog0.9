import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'                                                 
import type { Vocabulary } from '../types'                                                 
import request from '../api/client'

  export default function VocabularyListPage() {
    const { logout } = useAuth()
    const [vocabularies, setVocabularies] = useState<Vocabulary[]>([])

    useEffect(() => {
      request<Vocabulary[]>('/api/v1/vocabularies').then(setVocabularies)
    }, [])

    return (
      <div>
        <h1>単語帳</h1>
        <Link to="/vocabularies/new">単語を追加</Link>
        <Link to="/flashcard">フラッシュカード学習</Link>
        <button onClick={logout}>ログアウト</button>
        <ul>
          {vocabularies.map(v => (
            <li key={v.id}>{v.korean_word} — {v.japanese_meaning}</li>
          ))}
        </ul>
      </div>
    )
  }