import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation, useRouter } from 'expo-router';
import { SelectTraverles } from '@/constants/Options';
import OptionCard from '@/Components/Mytrips/OptionCard';
import { CreateTripContext } from '../context/CreateTripContext';

const SelectTravaler = () => {
	const navigation = useNavigation()
	const { tripData, setTripData } = useContext(CreateTripContext)
	const router = useRouter()
	const [SelectedTravaler, setSelectedTraveler] = useState<{
		id: number,
		title: string,
		desc: string,
		icon: string,
		people: string
	} | null>(null)
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

	useEffect(() => {
		setTripData({ ...tripData, traveler: SelectedTravaler })
	}, [SelectedTravaler])


	return (
		<View style={{
			padding: 25,
			paddingTop: 70,
			backgroundColor: 'white',
			height: '100%'
		}}>
			<Text style={{
				fontFamily: 'Poppins-Bold',
				fontSize: 35,
				marginTop: 15
			}}>
				Who's Travelling
			</Text>
			<View style={{ marginTop: 2 }}>
				<Text style={{ fontFamily: 'Poppins-Bold', fontSize: 23, }}>
					Choose your travelers
				</Text>
				<FlatList
					data={SelectTraverles}
					// keyExtractor={(item) => item.id.toString()}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							onPress={() => setSelectedTraveler(item)}
							style={{ marginVertical: 10 }}>
							<OptionCard options={item} selectedOptions={SelectedTravaler} />
						</TouchableOpacity>
					)}
				/>

			</View>
			<TouchableOpacity style={{
				padding: 15,
				backgroundColor: 'black',
				borderRadius: 15,
				marginTop: 10
			}}
			
			onPress={()=> router.push('/createtrip/selectdates')}
			>

				{/* <Link href={'/selectdates'} style={{ width: '100%', textAlign: 'center' }}> */}
					<Text style={{
						textAlign: 'center',
						color: 'white',
						fontFamily: 'Poppins-Regular',
						fontSize: 20
					}}>
						Continue
					</Text>
				{/* </Link> */}
			</TouchableOpacity>
		</View>
	)
}

export default SelectTravaler