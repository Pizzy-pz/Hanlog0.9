require "rails_helper"

RSpec.describe User, type: :model do
  describe "email" do
    it "がない場合は無効" do
      user = build(:user, email: nil)
      expect(user).not_to be_valid
    end

    it "が重複している場合は無効" do
      create(:user, email: "dup@example.com")
      user = build(:user, email: "dup@example.com")
      expect(user).not_to be_valid
    end
  end

  describe "password" do
    it "がない場合は無効" do
      user = build(:user, password: nil)
      expect(user).not_to be_valid
    end

    it "が正しければ認証できる" do
      user = create(:user, password: "password123")
      expect(user.authenticate("password123")).to be_truthy
      expect(user.authenticate("wrong")).to be_falsy
    end
  end

  describe "display_name" do
    it "がない場合は無効" do
      user = build(:user, display_name: nil)
      expect(user).not_to be_valid
    end

    it "が重複している場合は無効" do
      create(:user, display_name: "tanaka")
      user = build(:user, display_name: "tanaka")
      expect(user).not_to be_valid
    end

    it "が21文字以上の場合は無効" do
      user = build(:user, display_name: "a" * 21)
      expect(user).not_to be_valid
    end

    it "が20文字の場合は有効" do
      user = build(:user, display_name: "a" * 20)
      expect(user).to be_valid
    end
  end

  describe "learning_language" do
    it "がない場合は無効" do
      user = build(:user, learning_language: nil)
      expect(user).not_to be_valid
    end

    it "が許可された言語コードの場合は有効" do
      %w[ko en ja zh].each do |lang|
        expect(build(:user, learning_language: lang)).to be_valid
      end
    end

    it "が許可されていない言語コードの場合は無効" do
      user = build(:user, learning_language: "fr")
      expect(user).not_to be_valid
    end
  end

  describe "proficiency_level" do
    it "が0〜5の範囲内の場合は有効" do
      (0..5).each do |level|
        expect(build(:user, proficiency_level: level)).to be_valid
      end
    end

    it "が6以上の場合は無効" do
      user = build(:user, proficiency_level: 6)
      expect(user).not_to be_valid
    end

    it "が負の値の場合は無効" do
      user = build(:user, proficiency_level: -1)
      expect(user).not_to be_valid
    end
  end
end
