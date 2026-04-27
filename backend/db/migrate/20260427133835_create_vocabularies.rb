class CreateVocabularies < ActiveRecord::Migration[7.2]
  def change
    create_table :vocabularies do |t|
      t.references :user, null: false, foreign_key: true
      t.string :korean_word, null: false 
      t.string :japanese_meaning, null: false
      t.string :image_url
      t.integer :difficulty, null: false, default: 3
      t.integer :proficiency, null: false, default: 0
      t.timestamps
    end
  end
end
