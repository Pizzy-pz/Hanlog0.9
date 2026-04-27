require "test_helper"                                                                                                                                                                                                                                                   
class VocabularyTest < ActiveSupport::TestCase                                                                                           
    test "korean_wordがないと無効" do
        user = User.create!(email: "a@example.com", password: "password123")
        vocab = Vocabulary.new(user: user, korean_word: nil)
        assert_not vocab.valid?
    end
    test "japanese_meaning がないと無効" do
        user = User.create!(email: "a@example.com", password: "password123")
        vocab = Vocabulary.new(user: user, japanese_meaning: nil)
        assert_not vocab.valid?
    end
    test "difficulty が1〜5の範囲外だと無効" do
        user = User.create!(email: "a@example.com", password: "password123")
        vocab1 = Vocabulary.new(user: user, difficulty: 6)
        vocab2 = Vocabulary.new(user: user, difficulty: 0)
        assert_not vocab1.valid?
        assert_not vocab2.valid?
    end
    test "proficiency が0〜100の範囲外だと無効" do
        user = User.create!(email: "a@example.com", password: "password123")
        vocab1 = Vocabulary.new(user: user, proficiency: 101)
        vocab2 = Vocabulary.new(user: user,proficiency: -1)
        assert_not vocab1.valid?
        assert_not vocab2.valid?
    end
    test "user がないと無効" do
        user = User.create!(email: "a@example.com", password: "password123")
        vocab = Vocabulary.new(user: nil, korean_word: "학교", japanese_meaning: "学校", difficulty: 3, proficiency: 0)
        assert_not vocab.valid?
    end
end