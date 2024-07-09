import { View, Text, TextInput, StyleSheet, Alert, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/COnfigs/FirebaseConfig';


const Signup = () => {
	const router = useRouter()

	const [name, setName] = useState('');
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	console.log(name);

	const handleSignup = () => {
		if (!email && !name && !password) {
			ToastAndroid.show("Please Enter all Detail", ToastAndroid.LONG)
			return;
		}
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user);

			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(error);

			});
	}
	return (
		<>
			<View style={{

				padding: 25,
				paddingTop: 80,
				backgroundColor: 'white',
				height: '100%'


			}}>
				<Text
					style={{
						fontFamily: 'Poppins-Bold',
						fontSize: 30
					}}
				>Create New Account</Text>


				<View style={{ marginTop: 40 }}>
					<Text>
						Name
					</Text>
					<TextInput
						keyboardType='default'
						style={styles.input}
						placeholder='Enter Name'
						onChangeText={(value) => setName(value)}
					/>

				</View>
				<View style={{ marginTop: 20 }}>
					<Text>
						Email
					</Text>
					<TextInput
						keyboardType='email-address'
						style={styles.input}
						placeholder='Enter Email'
						onChangeText={(value) => setEmail(value)}
					/>

				</View>
				<View style={{ marginTop: 20 }}>
					<Text>
						Password
					</Text>
					<TextInput
						secureTextEntry={true}
						style={styles.input}
						placeholder='Enter Password'
						onChangeText={(value) => setPassword(value)}
					/>

				</View>
				<TouchableOpacity
					onPress={handleSignup}

					style={{ padding: 20, backgroundColor: 'black', borderRadius: 15, marginTop: 20, borderWidth: 1 }}>
					<Text style={{ color: 'white', textAlign: 'center' }}>
						Create Account
					</Text>
				</TouchableOpacity>



				<TouchableOpacity onPress={() => {
					router.replace('auth/login')
				}} style={{ padding: 20, backgroundColor: 'white', borderRadius: 15, marginTop: 20, borderWidth: 1 }}>
					<Text style={{ color: 'black', textAlign: 'center' }}>
						Sign In
					</Text>
				</TouchableOpacity>
			</View>
		</>
	)
}

export default Signup



const styles = StyleSheet.create({
	input: {
		padding: 15,
		borderWidth: 1,
		borderRadius: 15,
		borderColor: 'gray'

	}
})