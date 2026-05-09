require "rails_helper"

RSpec.describe Vocabulary, type: :model do
  it "korean_word がない場合は無効" do
    vocab = build(:vocabulary, korean_word: nil)
    expect(vocab).not_to be_valid
  end

  it "japanese_meaning がない場合は無効" do
    vocab = build(:vocabulary, japanese_meaning: nil)
    expect(vocab).not_to be_valid
  end

  it "difficulty が1〜5の範囲外の場合は無効" do
    expect(build(:vocabulary, difficulty: 6)).not_to be_valid
    expect(build(:vocabulary, difficulty: 0)).not_to be_valid
  end

  it "proficiency が0〜100の範囲外の場合は無効" do
    expect(build(:vocabulary, proficiency: 101)).not_to be_valid
    expect(build(:vocabulary, proficiency: -1)).not_to be_valid
  end

  it "user がない場合は無効" do
    vocab = build(:vocabulary, user: nil)
    expect(vocab).not_to be_valid
  end
end
