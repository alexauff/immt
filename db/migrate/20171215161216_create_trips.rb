class CreateTrips < ActiveRecord::Migration[5.1]
  def change
    create_table :trips do |t|
      t.string :city
      t.references :user, index:true

      t.timestamps
    end
  end
end
