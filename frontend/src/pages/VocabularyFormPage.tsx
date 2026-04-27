import { useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  import request from '../api/client'

  export default function VocabularyFormPage() {
    const navigate = useNavigate()
    const [koreanWord, setKoreanWord] = useState('')
    const [japaneseMeaning, setJapaneseMeaning] = useState('')
    const [difficulty, setDifficulty] = useState(3)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        await request('/api/v1/vocabularies', {
          method: 'POST',
          body: JSON.stringify({
            vocabulary: {
              korean_word: koreanWord,
              japanese_meaning: japaneseMeaning,
              difficulty,
            }
          }),
        })
        navigate('/vocabularies')
      } catch {
        setError('登録に失敗しました')
      }
    }

    return (
      <div>
        <h1>単語を追加</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input value={koreanWord} onChange={e => setKoreanWord(e.target.value)}
  placeholder="韓国語" />
          <input value={japaneseMeaning} onChange={e => setJapaneseMeaning(e.target.value)}  
  placeholder="日本語訳" />
          <input type="number" value={difficulty} onChange={e =>
  setDifficulty(Number(e.target.value))} min={1} max={5} />
          <button type="submit">追加</button>
        </form>
      </div>
    )
  }