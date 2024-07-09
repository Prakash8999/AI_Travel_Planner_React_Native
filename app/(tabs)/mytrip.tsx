import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { auth } from '@/COnfigs/FirebaseConfig'
import StartNewTrip from '@/Components/Mytrips/StartNewTrip'
import { useRouter } from 'expo-router'

const mytrip = () => {
	const user = auth.currentUser
	const router = useRouter()
	const [userTrips, setUserTrips] = useState([])

	return (
		<>
			<View style={{
				height: '100%',
				marginTop: 30,
				padding: 20,
				backgroundColor: 'white'
			}}>
				<View style={{
					display: 'flex',
					flexDirection: 'row',
					alignContent: 'center',
					justifyContent: 'space-between'
				}}>
					<Text style={{ fontSize: 35, fontFamily: 'Poppins-Bold' }}>
						My Trips
					</Text>

					<TouchableOpacity onPress={() => router.push('/createtrip/searchplace')}>
						<Text style={{ fontSize: 35, fontFamily: 'Poppins-Bold', color: 'black' }}>
							+
						</Text>
					</TouchableOpacity>
				</View>

				{
					userTrips?.length == 0 ?
						<StartNewTrip />
						: null

				}



			</View>

		</>
	)
}

export default mytrip