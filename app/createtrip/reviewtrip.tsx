import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { CreateTripContext } from '../context/CreateTripContext';
import moment from 'moment';

const reviewtrip = () => {
	const router = useRouter()
	const navigation = useNavigation();
	const { tripData, setTripData } = useContext(CreateTripContext);

	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTransparent: true,
			headerTitle: "",
			headerStyle: {
				backgroundColor: 'white'
			},
			headerTintColor: 'black'
		});
	}, []);
	console.log(tripData?.budget);

	return (
		<>
			<View style={{
				padding: 25,
				paddingTop: 70,
				backgroundColor: 'white',
				height: '100%'
			}}>
				<Text style={{
					fontSize: 35,
					marginTop: 20,
					fontFamily: 'Poppins-Bold'
				}}>
					Review Your Trip
				</Text>

				<View style={{ marginTop: 20 }}>
					<Text style={{
						fontFamily: "Poppins-Bold",
						fontSize: 20
					}}>
						Before genrating your trip, please review your selection.
					</Text>


					<View style={{ marginTop: 20, display: "flex", flexDirection: 'row', gap: 20 }}>
						<Ionicons name="location-sharp" size={30} color="#EA4335" />
						<View>
							<Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: '#808080' }}>
								Destination
							</Text>
							<Text style={{ fontFamily: 'Poppins-Medium', fontSize: 20, }}>
								{tripData?.locationInfo?.name}
							</Text>
						</View>
					</View>

					<View style={{ marginTop: 20, display: "flex", flexDirection: 'row', gap: 20 }}>
						<Text style={{ fontSize: 30 }}>
							🗓
						</Text>
						<View>
							<Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: '#808080' }}>
								Travel Date
							</Text>
							<Text style={{ fontFamily: 'Poppins-Medium', fontSize: 20, }}>
								{moment(tripData?.startDate).format('DD MMM') + " to " + moment(tripData?.endDate).format('DD MMM') + " "} ({tripData.totalNumberOfDays} days)
							</Text>
						</View>
					</View>

					<View style={{ marginTop: 20, display: "flex", flexDirection: 'row', gap: 20 }}>
						<Text style={{ fontSize: 30 }}>
							🚌
						</Text>
						<View>
							<Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: '#808080' }}>
								Who is Traveling
							</Text>
							<Text style={{ fontFamily: 'Poppins-Medium', fontSize: 20, }}>
								{tripData?.traveler?.title}
							</Text>
						</View>
					</View>
					<View style={{ marginTop: 20, display: "flex", flexDirection: 'row', gap: 20 }}>
						<Text style={{ fontSize: 30 }}>
							{tripData?.budget == 'Cheap' ? '💵' : tripData?.budget == 'Moderate' ? '💰' : '💸'}
						</Text>
						<View>
							<Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: '#808080' }}>
								Budget
							</Text>
							<Text style={{ fontFamily: 'Poppins-Medium', fontSize: 20, }}>
								{tripData?.budget}
							</Text>
						</View>
					</View>
				</View>
				<TouchableOpacity style={{
					padding: 15,
					backgroundColor: 'black',
					borderRadius: 15,
					marginTop: 10
				}}
					onPress={() => router.replace('/createtrip/generatetrip')}>
					<Text style={{
						textAlign: 'center',
						color: 'white',
						fontFamily: 'Poppins-Regular',
						fontSize: 20
					}}>
						Build My Trip
					</Text>
				</TouchableOpacity>
			</View>

		</>
	)
}

export default reviewtrip