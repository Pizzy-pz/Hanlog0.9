module Api
    module V1
      class VocabulariesController < ApplicationController
        before_action :authenticate_user!
        def index
            vocabularies = current_user.vocabularies
            render json: vocabularies
        end
        
        def create
        vocabulary = current_user.vocabularies.build(vocabulary_params)
            if vocabulary.save
                render json: vocabulary, status: :created
            else
                render json: { errors: vocabulary.errors }, status: :unprocessable_entity
            end
        end

        def show                                                                                                                           vocabulary = current_user.vocabularies.find(params[:id])                                                                     
            render json: vocabulary                                                                                                      
        end

        def update
          vocabulary = current_user.vocabularies.find(params[:id])
          update_attrs = vocabulary_params.except(:proficiency)

          if params.dig(:vocabulary, :correct) != nil
            delta = params[:vocabulary][:correct] ? 10 : -10
            update_attrs[:proficiency] = (vocabulary.proficiency + delta).clamp(0, 100)
          end

          if vocabulary.update(update_attrs)
            render json: vocabulary
          else
            render json: { errors: vocabulary.errors }, status: :unprocessable_entity
          end
        end

        def destroy
            vocabulary = current_user.vocabularies.find(params[:id])
            vocabulary.destroy
            head :no_content
        end
        
        private
        def vocabulary_params
            params.require(:vocabulary).permit(:korean_word, :japanese_meaning, :image_url, :difficulty, :proficiency)
        end
      end
    end
  end