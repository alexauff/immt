Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  get '/map', to: 'home#map'
  get '/trips', to: 'home#trips'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
