class TripsController < ApplicationController

		def index
			@trips = Trip.all
			if user_signed_in?
			#redirect_to_trips_path
			end
		end

		def new
			@trip = Trip.new
		end

		def show
		end

		def create
			@trip = Trip.new(trip_params)
			@trip.user_id = current_user.id
		end

		def destroy
			@trip.destroy
			respond_to do |format|
				format.html { redirect_to trips, notice: "Le trip a été supprimé." }
				format.json { head :no_content }
				end
		end


  # Use callbacks to share common setup or constraints between actions.
  def set_trip
  	@trip = Trip.find(params[:id])
  end

    # Never trust parameters from the scary internet, only allow the white list through.
  def trip_params
      #Ajouter identifiant de l’utilisateur dans le post
      params.require(:trip).permit(:city, :user_id)
	end
end


