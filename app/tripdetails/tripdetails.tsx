
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import FlightInfo from '@/Components/TripDetails/FlightInfo';
import HotelList from '@/Components/TripDetails/HotelList';
import PlanedTrip from '@/Components/TripDetails/PlanedTrip';
// import { fetchUnsplashPhotos } from '@/Configs/UnsplashPhotos';

interface Flight {
	airline: string;
	arrival_city: string;
	arrival_date: string;
	arrival_time: string;
	booking_url: string;
	departure_city: string;
	departure_date: string;
	departure_time: string;
	flight_number: string;
	price: string;
}

interface Itinerary {
	best_time_to_visit: string,
	day: number,
	description: string,
	title: string
}


interface Hotel {
	address: string;
	description: string;
	geo_coordinates: [number, number];
	image_url: string;
	name: string;
	price: string;
	rating: number;
}

interface TripDetails {
	tripData: string;
	tripPlane: {
		trip: {
			flights: Array<Flight>;
			travelers: string;
			budget: string;
			duration: string;
			itinerary: Array<Itinerary>;
			destination: string;
			hotels: Array<Hotel>;
		};
	};
	docId: string;
	userId: string;
	userEmail: string;
}

const TripDetailsPage: React.FC = () => {
	const navigation = useNavigation();
	const { trip } = useLocalSearchParams();
	const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);

	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTransparent: true,
			headerTitle: '',
		});

		console.log("Raw trip data:", trip);

		if (typeof trip === 'string') {
			try {
				const parsedTrip: TripDetails = JSON.parse(trip);
				setTripDetails(parsedTrip);
				console.log("Parsed Trip Details:", parsedTrip);
			} catch (error) {
				console.error("Error parsing trip data:", error);
				setTripDetails(null);
			}
		} else {
			console.error("Trip data is not a string:", trip);
			setTripDetails(null);
		}
	}, [trip, navigation]);

	const tripData = tripDetails ? JSON.parse(tripDetails.tripData) : null;
	console.log("Trip Data:", tripData);
	console.log("plan Data:", tripDetails?.tripPlane?.trip?.itinerary);



	
	return tripDetails && (
		<ScrollView>
			<Text>Trip Details</Text>

			{tripData?.locationInfo?.photoRef && (
				<Image
					source={{
						uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tripData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API}`,
					}}
					style={{ width: '100%', height: 300 }}
				/>
			)}
			<View style={{
				padding: 15,
				backgroundColor: 'white',
				height: '100%',
				marginTop: -30,
				borderTopRightRadius: 30,
				borderTopLeftRadius: 30,
			}}>

				
				<Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold' }}>
					{tripDetails?.tripPlane?.trip?.destination}
				</Text>
				<View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
					<Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular', color: 'gray' }}>
						{moment(tripData?.startDate).format('DD MMM yyyy')}
					</Text>
					<Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: 'gray' }}>
						- {moment(tripData?.endDate).format('DD MMM yyyy')}
					</Text>
				</View>
				<View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
					<Text>🚌</Text>
					<Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, color: 'gray' }}>
						{tripData?.traveler?.title}
					</Text>
				</View>
				<FlightInfo flightData={tripDetails?.tripPlane?.trip?.flights} />
				{tripDetails?.tripPlane?.trip?.hotels && tripDetails.tripPlane.trip.hotels.length > 0 ? (
					<HotelList hotelList={tripDetails.tripPlane.trip.hotels} />
				) : (
					<Text>No hotels available.</Text>
				)}


				<PlanedTrip details={tripDetails?.tripPlane?.trip?.itinerary} />
			</View>
		</ScrollView>
	);
}

export default TripDetailsPage;
