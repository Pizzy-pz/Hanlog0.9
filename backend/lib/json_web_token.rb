module JsonWebToken
    # ここに encode と decode を実装する
    def self.encode(payload)
        # ここに処理
        payload[:exp] = 24.hours.from_now.to_i
        JWT.encode(payload, Rails.application.secret_key_base)
    end
  
    def self.decode(token)
        # ここに処理
        decoded = JWT.decode(token, Rails.application.secret_key_base)[0]
        HashWithIndifferentAccess.new(decoded)
        rescue JWT::DecodeError
            nil
    end
end