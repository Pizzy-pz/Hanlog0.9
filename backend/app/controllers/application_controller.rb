class ApplicationController < ActionController::API
    private
    
    def authenticate_user!
        header = request.headers['Authorization']   # ヘッダーを取得
        token = header&.split(' ')&.last            # "Bearer xxx" → "xxx"
        decoded = JsonWebToken.decode(token)        # トークンを解読

        @current_user = User.find_by(id: decoded[:user_id]) if decoded

        unless @current_user
            render json: { error: 'Unauthorized' }, status: :unauthorized
        end
    end

    def current_user
        @current_user
    end
end
