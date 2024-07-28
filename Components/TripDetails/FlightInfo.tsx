import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import moment from 'moment';

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

interface FlightProps {
	flightData: Flight[];
}

const FlightInfo: React.FC<FlightProps> = ({ flightData }) => {
	console.log("fd", flightData);



	return (
		<View style={{
			marginTop: 10
		}}>


			{flightData.map((flight, index) => (
				<View key={index} style={styles.flightContainer}>
					<View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>

						<Text style={{ fontFamily: 'Poppins-Bold', fontSize: 17 }}>
							✈️ Flight
						</Text>
						<TouchableOpacity style={{ backgroundColor: 'black', width: 100, padding: 5, borderRadius: 7 }}
						  onPress={() => Linking.openURL(flight.booking_url)}
						>

							<Text style={{ color: 'white', textAlign: 'center' }}>
								Book Here
							</Text>
						</TouchableOpacity>
					</View>
					<Text style={{ fontFamily: "Poppins-Regular" }}>Airline: {flight.airline}</Text>

					<Text style={{ fontFamily: "Poppins-Regular" }}>Price: {flight.price } (approx)</Text>

				</View>
			))}


		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	flightContainer: {
		marginBottom: 15,
		padding: 12,
		backgroundColor: '#f8f8f8',
		borderRadius: 8,
	},
	text: {
		fontSize: 16,
		marginBottom: 5,
	},
});

export default FlightInfo;
