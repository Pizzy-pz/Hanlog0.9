module Jwt
  class Encoder
    ACCESS_TOKEN_EXP = 15.minutes
    REFRESH_TOKEN_EXP = 7.days

    def self.encode(payload, token_type: :access)
      exp = token_type == :refresh ? REFRESH_TOKEN_EXP : ACCESS_TOKEN_EXP
      payload[:exp] = exp.from_now.to_i
      payload[:token_type] = token_type.to_s
      JWT.encode(payload, Rails.application.secret_key_base)
    end
  end
end
