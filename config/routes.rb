Rails.application.routes.draw do
  get 'trips/index'

  devise_for :users
  resources :trips #définir toutes les routes pour trips
  root 'home#index'
  get '/map', to: 'home#map'

end
