class CreatePlaces < ActiveRecord::Migration[5.1]
  def change
    create_table :places do |t|
      t.string :id_javascript
      t.string :name
      t.string :img_url
      t.references :trip, index:true

      t.timestamps
    end
  end
end
