FactoryBot.define do
  factory :vocabulary do
    association :user
    korean_word { "학교" }
    japanese_meaning { "学校" }
    difficulty { 3 }
    proficiency { 0 }
  end
end
