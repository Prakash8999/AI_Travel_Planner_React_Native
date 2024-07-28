import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment';

interface TripProps {
	trip: {
		docId: string;
		tripData: string,
		tripPlane: {
			trip: {
				budget: string;
				destination: string;
				duration: string;
				flights: Array<any>; // Update with actual type if known
				hotels: Array<any>;  // Update with actual type if known
				itinerary: Array<any>; // Update with actual type if known
				travelers: string;
			};
		};
		userEmail: string;
		userId: string;
	}
}


const UsetTripCard: React.FC<TripProps> = ({ trip }) => {
	const tripData = JSON.parse(trip.tripData);

	return (
		<View style={{
			marginTop: 15,
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			alignItems: 'center',
		}}>

			{/* <Image
				source={require('@/assets/images/placeholderimg.png')}
				style={{
					width: 80,
					height: 80,
					borderRadius:10
				}}
			/> */}
			<Image
				source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tripData.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API}` }}
				style={{
					width: 80,
					height: 80,
					borderRadius:10
				}}
			/>
			<View>
				<Text style={{
					fontFamily: "Poppins-Medium",
					fontSize: 15
				}}>{trip?.tripPlane?.trip?.destination}</Text>
				<Text style={{
					fontFamily: "Poppins-Regular",
					fontSize: 12,
					color: 'gray'
				}}>{moment(tripData?.startDate).format('DD MMMM yyyy')}</Text>
				<Text style={{
					fontFamily: "Poppins-Regular",
					fontSize: 12,
					color: 'gray'
				}}>{tripData?.traveler?.title}</Text>
			</View>
		</View>
	)
}

export default UsetTripCard