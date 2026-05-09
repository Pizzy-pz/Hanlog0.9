class AddProfileColumnsToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :display_name, :string
    add_column :users, :learning_language, :string, null: false, default: "ko"
    add_column :users, :proficiency_level, :integer, null: false, default: 0
    add_column :users, :timezone, :string
    add_index :users, :display_name, unique: true
  end
end
