import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ToastAndroid, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment, { Moment } from 'moment';
import { CreateTripContext } from '../context/CreateTripContext';
import { useNavigation, useRouter } from 'expo-router';

const SelectDates: React.FC = () => {
	const { tripData, setTripData } = useContext(CreateTripContext);
	const [startDate, setStartDate] = useState<Moment | null>(null);
	const [endDate, setEndDate] = useState<Moment | null>(null);
	const [showStartDatePicker, setShowStartDatePicker] = useState(false);
	const [showEndDatePicker, setShowEndDatePicker] = useState(false);

	const onChangeStartDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
		setShowStartDatePicker(Platform.OS === 'ios');
		if (selectedDate) {
			const newStartDate = moment(selectedDate).startOf('day'); // Start date set to beginning of the day
			setStartDate(newStartDate);
			if (endDate && newStartDate.isAfter(endDate)) {
				setEndDate(null); // Reset end date if it's before new start date
			}
		}
	};

	const onChangeEndDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
		setShowEndDatePicker(Platform.OS === 'ios');
		if (selectedDate) {
			const newEndDate = moment(selectedDate).startOf('day'); // End date set to beginning of the day
			setEndDate(newEndDate);
			if (startDate && newEndDate.isBefore(startDate)) {
				setStartDate(null); // Reset start date if it's after new end date
			}
		}
	};
	const navigation = useNavigation()
	const router = useRouter()
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

	const handleDateDifference = () => {
		if (!startDate || !endDate) {
			ToastAndroid.show("Please Select Start and End Date", ToastAndroid.LONG);
			return;
		}
		const totalNumberOfDays = endDate.diff(startDate, 'days') + 1;
		console.log(totalNumberOfDays);

		const formattedStartDate = startDate.format('MMMM Do YYYY');
		const formattedEndDate = endDate.format('MMMM Do YYYY');
		console.log(`Start Date: ${formattedStartDate}, End Date: ${formattedEndDate}`);

		setTripData({
			...tripData,
			startDate: startDate.toDate(),
			endDate: endDate.toDate(),
			totalNumberOfDays: totalNumberOfDays + 1,
		});
	router.push('/createtrip/selectbudget')
	};

	return (
		<View style={{ flex: 1, padding: 25, paddingTop: 75, backgroundColor: 'white' }}>
			<Text style={{ fontFamily: 'Poppins-Bold', fontSize: 35, marginTop: 20, marginBottom: 20 }}>Travel Dates</Text>
			<View style={{ backgroundColor: 'white', padding: 20, borderRadius: 15, marginBottom: 20 }}>
				<TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={{ padding: 15, backgroundColor: '#e0e0e0', borderRadius: 10, marginBottom: 15 }}>
					<Text style={{ textAlign: 'center', color: 'black', fontFamily: 'Poppins-Regular', fontSize: 18 }}>
						{startDate ? startDate.format('MMMM Do YYYY') : 'Select Start Date'}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={{ padding: 15, backgroundColor: '#e0e0e0', borderRadius: 10 }}>
					<Text style={{ textAlign: 'center', color: 'black', fontFamily: 'Poppins-Regular', fontSize: 18 }}>
						{endDate ? endDate.format('MMMM Do YYYY') : 'Select End Date'}
					</Text>
				</TouchableOpacity>
			</View>
			{showStartDatePicker && (
				<DateTimePicker
					testID="dateTimePickerStart"
					value={startDate?.toDate() || new Date()}
					
					mode="date"
					display="default"
					onChange={onChangeStartDate}
					minimumDate={moment().startOf('day').toDate()} // Minimum date is today
				/>
			)}
			{showEndDatePicker && (
				<DateTimePicker
					testID="dateTimePickerEnd"
					
					value={endDate?.toDate() || new Date()}
					mode="date"
					display="default"
					onChange={onChangeEndDate}
					minimumDate={moment().startOf('day').toDate()}
				/>
			)}
			<TouchableOpacity
				onPress={handleDateDifference}
				style={{ padding: 15, backgroundColor: 'black', borderRadius: 15, marginTop: 20 }}
			>
				<Text style={{ textAlign: 'center', color: 'white', fontFamily: 'Poppins-Regular', fontSize: 20 }}>
					Continue
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SelectDates;
