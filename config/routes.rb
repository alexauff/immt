Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  get '/map', to: 'home#map'
 get '/trips', to: 'home#trips'

end
