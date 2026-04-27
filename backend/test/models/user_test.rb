require "test_helper"                                                                                                                                                                                                                                                   
class UserTest < ActiveSupport::TestCase                                                                                           
    test "emailがない場合は無効" do
        user = User.new(email: nil, password: "password123")
        assert_not user.valid?
    end
    test "同じemailは登録できない" do
        User.create!(email: "test@example.com", password: "password123")
        user2 = User.new(email: "test@example.com", password: "password456")
        assert_not user2.valid?
    end
    test "passwordがない場合は無効" do
        user = User.new(email: "test@example.com", password: nil)
        assert_not user.valid?
    end
    test "正しいパスワードで認証できる" do
        user = User.create!(email: "test@example.com", password: "password123")
        assert user.authenticate("password123")
        assert_not user.authenticate("wrongpassword")
    end
end