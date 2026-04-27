class Vocabulary < ApplicationRecord
    belongs_to :user
    validates :korean_word, presence: true
    validates :japanese_meaning, presence: true
    validates :difficulty,       inclusion: { in: 1..5 }
    validates :proficiency,      inclusion: { in: 0..100 }
end