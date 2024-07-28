import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import UsetTripCard from './Mytrips/UsetTripCard';
import { useRouter } from 'expo-router';
import { fetchUnsplashPhotos } from '@/Configs/UnsplashPhotos';
import { GetPhotoRef } from '@/Services/GooglePlacesApi';

interface UserTrip {
	docId: string;
	tripData: string; // JSON string
	tripPlane: {
		trip: {
			budget: string;
			destination: string;
			duration: string;
			flights: Array<any>;
			hotels: Array<any>;
			itinerary: Array<any>;
			travelers: string;
		};
	};
	userEmail: string;
	userId: string;
}

interface UserTripsListProps {
	UserTrips: UserTrip[];
}

const UserTripList: React.FC<UserTripsListProps> = ({ UserTrips }) => {
	const LatestTrip = JSON.parse(UserTrips[0].tripData);

const router = useRouter()
const [photos, setPhotos] = useState<{ [key: string]: string }>({});


useEffect(() => {
	const fetchPhoto = async () => {
	  const placeName = UserTrips[0].tripPlane.trip.destination; // Replace with your actual place name
  
	  try {
		if (placeName) {
		  const photoUrl = await GetPhotoRef(placeName);
		  // Check if the photoUrl is valid
		  if (photoUrl) {
			setPhotos({  photoUrl });
		  } else {
			setPhotos({ [placeName]: 'default_image_url' }); // Set default image URL if no photo found
		  }
		}
	  } catch (error) {
		console.error('Error fetching photo:', error);
		setPhotos({ [placeName]: 'default_image_url' }); // Set default image URL on error
	  }
	};
  
	fetchPhoto();
  }, []); // Empty dependency array if you only need to fetch once
console.log(photos.photoUrl);

  
	return (

		<View>
			<View style={{ marginTop: 20 }}>
				{
					LatestTrip?.locationInfo?.photoRef ? <Image
						source={{ uri:photos.photoUrl}}
						style={{
							width: '100%',
							height: 240,
							objectFit: 'cover',
							borderRadius: 15,
						}}
					/> : <Image
						source={require('@/assets/images/placeholderimg.png')}
						style={{
							width: '100%',
							height: 240,
							objectFit: 'cover',
							borderRadius: 15,
						}}
					/>
				}
				<View style={{ marginTop: 10 }}>
					<Text style={{ fontFamily: 'Poppins-Medium', fontSize: 20 }}>
						{UserTrips[0].tripPlane.trip.destination}
					</Text>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginTop: 5,
						}}
					>
						<Text style={{ fontFamily: 'Poppins-Regular', fontSize: 17 }}>
							{moment(LatestTrip.startDate).format('DD MMMM yyyy')}
						</Text>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignContent: 'center',
								columnGap: 10,
							}}
						>
							<Text>🚌</Text>
							<Text style={{ fontFamily: 'Poppins-Regular', fontSize: 17 }}>
								{LatestTrip.traveler.title}
							</Text>
						</View>
					</View>
					<View
						style={{
							backgroundColor: 'black',
							padding: 15,
							borderRadius: 15,
							marginTop: 10,
						}}
					// onPress={()=>router.push({
					// 	pathname:'/tripdetails/tripdetails',
					// 	params:{
					// 		trip:JSON.stringify(UserTrips[0]) 
					// 	}
					// })}
					>
						<Text
							style={{
								color: 'white',
								fontFamily: 'Poppins-Medium',
								textAlign: 'center',
								fontSize: 15,
							}}
						>
							See Your Plan
						</Text>
					</View>
				</View>
				{UserTrips.map((trip, index) => (
					<View key={index} style={{ marginBottom: 10 }}>
						<TouchableOpacity
							onPress={() => router.push({
								pathname: '/tripdetails/tripdetails',
								params: {
									trip: JSON.stringify(UserTrips[index])
								}
							})}
						>


							<UsetTripCard trip={trip} />
						</TouchableOpacity>
					</View>
				))}
			</View>
		</View>
	);
};

export default UserTripList;
