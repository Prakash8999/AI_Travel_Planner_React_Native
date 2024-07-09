import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
const StartNewTrip = () => {
	const router = useRouter()
	return (
		<View style={{
			padding: 20,
			marginTop: 50,
			display: "flex",
			alignItems: 'center',
			gap: 25
		}}>
			<MaterialIcons name="add-location" size={50} color="black" />

			<Text style={{ fontSize: 25, fontFamily: 'Poppins-Bold' }}>
				No Trip Plan Yet
			</Text>

			<Text style={{ fontSize: 25, fontFamily: 'Poppins-Light', textAlign:'center' }}>
				Time to explore new horizons! Create your next great escape with just a click
			</Text>


			<TouchableOpacity 
			onPress={() => router.push('/createtrip/searchplace')}
			
			style={{ backgroundColor: 'black', borderRadius: 25, width:200, paddingVertical:15 }}>
				<Text style={{ color: 'white', textAlign: 'center' , fontFamily:'Poppins-Regular', fontSize:20}}>
					Start New Trip
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default StartNewTrip