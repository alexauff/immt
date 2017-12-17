class Trip < ApplicationRecord
  has_many :places
  belongs_to :user
end
