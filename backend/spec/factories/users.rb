FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    sequence(:display_name) { |n| "user#{n}" }
    password { "password123" }
    learning_language { "ko" }
    proficiency_level { 0 }
    timezone { nil }
  end
end
