import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Vocabulary } from '../types'
import request from '../api/client'                                                                       
  
  export default function FlashCardPage() {
    const [cards, setCards] = useState<Vocabulary[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
      request<Vocabulary[]>('/api/v1/vocabularies').then(setCards)
    }, [])

    const handleAnswer = async (isCorrect: boolean) => {
      await request(`/api/v1/vocabularies/${current.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ vocabulary: { correct: isCorrect } }),
      })
      setIsFlipped(false)
      if (currentIndex + 1 >= cards.length) {
        setCompleted(true)
      } else {
        setCurrentIndex(prev => prev + 1)
      }
    }

    const current = cards[currentIndex]
    if (completed) return (
      <div className="flex flex-col items-center gap-6 text-white text-center">
        <p className="text-4xl">🎉</p>
        <h2 className="text-2xl font-bold">完了しました！</h2>
        <p className="text-white/70">{cards.length}枚すべて学習しました</p>
        <Link to="/vocabularies" className="bg-white text-purple-600 font-bold px-6 py-3 rounded-xl">
          単語帳に戻る
        </Link>
      </div>
    )
    if (!current) return <div className="text-white text-center">単語がありません</div>

    return (
      <div className="flex flex-col items-center gap-6">
        <p className="text-white/70">{currentIndex + 1} / {cards.length}</p>

        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full max-w-lg bg-white/20 backdrop-blur-sm rounded-2xl p-8 cursor-pointer text-center
   min-h-64 flex flex-col items-center justify-center gap-4"
        >
          {!isFlipped ? (
            <>
              {current.image_url && (
                <img src={current.image_url} alt="" className="w-48 h-36 object-cover rounded-xl" />        
              )}
              <p className="text-4xl font-bold text-white">{current.korean_word}</p>
              <p className="text-white/60 text-sm">タップして答えを見る</p>
            </>
          ) : (
            <p className="text-3xl font-bold text-white">{current.japanese_meaning}</p>
          )}
        </div>

        {isFlipped && (
          <div className="flex gap-4">
            <button
              onClick={() => handleAnswer(false)}
              className="bg-red-400 hover:bg-red-500 text-white font-semibold px-8 py-3 rounded-xl
  transition"
            >
              不正解
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="bg-green-400 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-xl      
  transition"
            >
              正解
            </button>
          </div>
        )}

        <div className="w-full max-w-lg bg-white/10 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2 transition-all"
            style={{ width: `${current.proficiency}%` }}
          />
        </div>
        <p className="text-white/60 text-sm">習熟度: {current.proficiency}%</p>
      </div>
    )
  }