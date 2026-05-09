module Jwt
  class Decoder
    # TODO(human): decode メソッドを実装する
    def self.decode(token)
      decoded = JWT.decode(token, Rails.application.secret_key_base, true, { algorithm: "HS256" })[0]
      HashWithIndifferentAccess.new(decoded)
    rescue JWT::DecodeError
      nil
    end
  end
end
