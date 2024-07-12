import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '@/Configs/FirebaseConfig'
import StartNewTrip from '@/Components/Mytrips/StartNewTrip'
import { useRouter } from 'expo-router'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import UserTripList from '@/Components/UserTripList'

const mytrip = () => {
	interface UserTrip {
		docId: string;
		tripData: {
			locationInfo: {
				name: string;
				coordinates: {
					lat: number;
					lng: number;
				};
				photoRef: string;
				url: string;
			};
			traveler: {
				id: number;
				title: string;
				desc: string;
				icon: string;
				people: string;
			};
			startDate: string;
			endDate: string;
			totalNumberOfDays: number;
			budget: string;
		};
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

	const user = auth.currentUser
	const router = useRouter()
	const [userTrips, setUserTrips] = useState<UserTrip[]>([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		user && handleMyTrip()
	}, [user])



	const handleMyTrip = async () => {
		setLoading(true);
		setUserTrips([])
		const q = query(collection(db, "UserTrips"), where("userId", "==", user?.uid));
		const querySnapshot = await getDocs(q)
		const trips: UserTrip[] = [];
		querySnapshot.forEach((doc) => {
			console.log(doc.id, '=>', doc.data());
			trips.push(doc.data() as UserTrip);
		})
		setUserTrips(trips)
		setLoading(false)
	}

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
				{loading && <ActivityIndicator size={'large'} color={'black'} />}
				{
					userTrips?.length == 0 ?
						<StartNewTrip />
						: <UserTripList UserTrips = {userTrips} />
				}



			</View>

		</>
	)
}

export default mytrip