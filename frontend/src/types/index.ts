export type User = {                                                                       
    id: number
    email: string
  }

  export type Vocabulary = {
    id: number
    user_id: number
    korean_word: string
    japanese_meaning: string
    image_url: string | null
    difficulty: number
    proficiency: number
    created_at: string
    updated_at: string
  }