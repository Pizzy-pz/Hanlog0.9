class User < ApplicationRecord
    has_secure_password
    has_many :vocabularies, dependent: :destroy
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

    validates :display_name, presence: true, uniqueness: true, length: { maximum: 20 }
    validates :learning_language, presence: true, inclusion: { in: %w[ko en ja zh] }
    validates :proficiency_level, presence: true, inclusion: { in: (0..5).to_a }
end
