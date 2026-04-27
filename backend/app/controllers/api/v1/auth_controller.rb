module Api
    module V1
        class AuthController < ApplicationController
        # signup, login, logout をここに書く
            def signup
                user = User.new(user_params)
                if user.save
                token = JsonWebToken.encode(user_id: user.id)
                render json: { token: token, user: { id: user.id, email: user.email } }, status: :created
                else
                render json: { errors: user.errors }, status: :unprocessable_entity
                end
            end
            
            def login
                user = User.find_by(email: params[:email])
                                                                                                                                                
                if user&.authenticate(params[:password])
                    token = JsonWebToken.encode(user_id: user.id)
                    render json: { token: token, user: { id: user.id, email: user.email } }
                else
                    render json: { error: 'メールアドレスまたはパスワードが違います' }, status: :unauthorized
                end
            end

            def logout
                head :ok
            end

            private
            
            def user_params
                params.require(:user).permit(:email, :password)
            end
        end
    end
end