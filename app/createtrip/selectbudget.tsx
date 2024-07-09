import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { slectBudgetOptions } from '@/constants/Options';
import OptionCard from '@/Components/Mytrips/OptionCard';
import { CreateTripContext } from '../context/CreateTripContext';

const selectbudget = () => {
	const [selectedOption, setSelectedOption] = useState<{
		id: number,
		title: string,
		desc: string,
		icon: string,
		people?: string
	} | null>(null)
	const { tripData, setTripData } = useContext(CreateTripContext);
	const router = useRouter()

	const navigation = useNavigation()
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
		selectedOption && setTripData({ ...tripData, budget: selectedOption?.title })
		console.log(tripData);

	}, [selectedOption])

	const handleContinue = () => {
		if (!selectedOption) {
			ToastAndroid.show('Please select your budget', ToastAndroid.LONG)
			return;
		}

		router.push('/createtrip/reviewtrip')
	}
	return (
		<>
			<View style={{
				padding: 25,
				paddingTop: 70,
				backgroundColor: 'white',
				height: '100%'
			}}>

				<Text style={{
					fontFamily: 'Poppins-Bold',
					fontSize: 35,
					marginTop: 20
				}}>
					Budget
				</Text>

				<View style={{
					marginTop: 20
				}}>
					<Text style={{
						fontFamily: 'Poppins-Bold',
						fontSize: 20
					}}>
						Choose your spending habbit for your trip
					</Text>
					<FlatList
					
						data={slectBudgetOptions}
						renderItem={({ item, index }) => (


							<TouchableOpacity style={{ marginVertical: 10 }}
								onPress={() => setSelectedOption(item)}

							>
								<OptionCard
									options={item}
									selectedOptions={selectedOption}
								/>
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

					onPress={() => handleContinue()}
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

		</>
	)
}

export default selectbudget