import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Vocabulary } from '../types'
import request from '../api/client'                                                                       
  
  export default function VocabularyListPage() {
    const [vocabularies, setVocabularies] = useState<Vocabulary[]>([])

    useEffect(() => {
      request<Vocabulary[]>('/api/v1/vocabularies').then(setVocabularies)
    }, [])

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">単語帳</h1>
          <Link to="/vocabularies/new" className="bg-white text-purple-600 font-semibold px-4 py-2
  rounded-lg hover:bg-white/90">
            + 単語を追加
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {vocabularies.map(v => (
            <div key={v.id} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
              {v.image_url && <img src={v.image_url} alt={v.korean_word} className="w-full h-32 object-cover
   rounded-lg mb-3" />}
              <p className="text-xl font-bold">{v.korean_word}</p>
              <p className="text-white/80">{v.japanese_meaning}</p>
              <p className="text-xs text-white/60 mt-1">難易度: {v.difficulty} / 習熟度:
  {v.proficiency}%</p>
            </div>
          ))}
        </div>
      </div>
    )
  }