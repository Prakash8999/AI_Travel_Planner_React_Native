import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment';
interface UserTrip {

	docId: string;
	tripData: string
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

interface UserTripsListProps {
	UserTrips: UserTrip[]
}
const UserTripList: React.FC<UserTripsListProps> = ({ UserTrips }) => {
	const LatestTrip = JSON.parse(UserTrips[0].tripData)
	return (
		<View>
			<View style={{ marginTop: 20 }}>
				<Image
					source={require('@/assets/images/placeholderimg.png')}
					style={{
						width: '100%',
						height: 240,
						objectFit: 'cover',
						borderRadius: 15
					}}
				/>

				<View style={{
					marginTop: 10
				}}>
					<Text style={{
						fontFamily: 'Poppins-Medium',
						fontSize: 20
					}}>
						{UserTrips[0].tripPlane.trip.destination}
					</Text>
					<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
						<Text style={{
							fontFamily: 'Poppins-Regular',
							fontSize: 17
						}}>
							{moment(LatestTrip?.startDate).format('DD MMMM yyyy')}
						</Text>
						<View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', columnGap: 10 }}>

							<Text>
								🚌
							</Text>

							<Text style={{
								fontFamily: 'Poppins-Regular',
								fontSize: 17
							}}>
								{LatestTrip?.traveler?.title}
							</Text>
						</View>

					</View>
						<TouchableOpacity style={{
							backgroundColor:'black',
							padding:15,
							borderRadius:15,
							marginTop:10
						}}>
							<Text style={{
								color:'white',
								fontFamily:'Poppins-Medium',
								textAlign:'center',
								fontSize:15
							}}>
								See Your Plan
							</Text>
						</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

export default UserTripList