class ApplicationController < ActionController::Base
	protect_from_forgery with: :exception
	before_action :sanitize_devise_params, if: :devise_controller?
	layout :layout_by_resource
	def sanitize_devise_params
		devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
	end

	def layout_by_resource
    if devise_controller?
      'deviseLayout'
    end
  end

	
	end
