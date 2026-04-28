import { useState } from 'react'
import { useNavigate } from 'react-router-dom'                                                           
import request from '../api/client'                                                                      

export default function VocabularyFormPage() {
  const navigate = useNavigate()
  const [koreanWord, setKoreanWord] = useState('')
  const [japaneseMeaning, setJapaneseMeaning] = useState('')
  const [difficulty, setDifficulty] = useState(3)
  const [error, setError] = useState('')
  const [imageKeyword, setImageKeyword] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [selectedImageUrl, setSelectedImageUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await request('/api/v1/vocabularies', {
        method: 'POST',
        body: JSON.stringify({
          vocabulary: { korean_word: koreanWord, japanese_meaning: japaneseMeaning, difficulty,
image_url: selectedImageUrl || null }
        }),
      })
      navigate('/vocabularies')
    } catch {
      setError('登録に失敗しました')
    }
  }

  const searchImages = async () => {
    const key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${imageKeyword}&per_page=6`,
      { headers: { Authorization: `Client-ID ${key}` } }
    )
    const data = await res.json()
    setSearchResults(data.results.map((r: { urls: { small: string } }) => r.urls.small))
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">単語を追加</h1>
      {error && <p className="text-red-300 mb-4">{error}</p>}
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-4">
        <input
          value={koreanWord}
          onChange={e => setKoreanWord(e.target.value)}
          placeholder="韓国語"
          className="w-full bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-xl
 px-4 py-3 outline-none focus:border-white"
        />
        <input
          value={japaneseMeaning}
          onChange={e => setJapaneseMeaning(e.target.value)}
          placeholder="日本語訳"
          className="w-full bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-xl
 px-4 py-3 outline-none focus:border-white"
        />
        <div className="flex items-center gap-3">
          <label className="text-white/80 text-sm">難易度</label>
          <input
            type="range"
            min={1} max={5}
            value={difficulty}
            onChange={e => setDifficulty(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-white font-bold w-4">{difficulty}</span>
        </div>
        <div className="flex gap-2">
          <input
            value={imageKeyword}
            onChange={e => setImageKeyword(e.target.value)}
            placeholder="画像検索（英語）例: school"
            className="flex-1 bg-white/20 text-white placeholder-white/60 border border-white/30
rounded-xl px-4 py-3 outline-none focus:border-white"
          />
          <button type="button" onClick={searchImages} className="bg-white/30 hover:bg-white/40
text-white px-4 py-3 rounded-xl transition">
            検索
          </button>
        </div>
        {searchResults.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {searchResults.map((url, i) => (
              <img
                key={i}
                src={url}
                alt=""
                onClick={() => setSelectedImageUrl(url)}
                className={`w-full h-20 object-cover rounded-lg cursor-pointer transition
${selectedImageUrl === url ? 'ring-4 ring-white' : 'opacity-70 hover:opacity-100'}`}
              />
            ))}
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-white text-purple-600 font-bold py-3 rounded-xl hover:bg-white/90
transition"
        >
          追加する
        </button>
      </div>
    </div>
  )
}