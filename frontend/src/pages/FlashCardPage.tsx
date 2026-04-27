import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Vocabulary } from '../types'
import request from '../api/client'

export default function FlashCardPage() {
  const [cards, setCards] = useState<Vocabulary[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    request<Vocabulary[]>('/api/v1/vocabularies').then(setCards)
  }, [])

  const handleAnswer = async (isCorrect: boolean) => {
    const newProficiency = isCorrect
      ? Math.min(100, current.proficiency + 10)
      : Math.max(0, current.proficiency - 10)

    await request(`/api/v1/vocabularies/${current.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ vocabulary: { proficiency: newProficiency } }),
    })

    setIsFlipped(false)
    setCurrentIndex(prev => (prev + 1) % cards.length)
  }

  const current = cards[currentIndex]
  if (!current) return <div>単語がありません</div>

  return (
    <div>
    <Link to="/vocabularies">← 単語帳に戻る</Link>
      <p>{currentIndex + 1} / {cards.length}</p>
      <div onClick={() => setIsFlipped(!isFlipped)}>
        {isFlipped ? current.japanese_meaning : current.korean_word}
      </div>
      {isFlipped && ( 
        <div>
            <button onClick={() => handleAnswer(true)}>正解</button>
            <button onClick={() => handleAnswer(false)}>不正解</button>
        </div>
        )}
    </div>
  )
}