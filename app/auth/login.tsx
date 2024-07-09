import { View, Text, TextInput, StyleSheet, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Redirect, useRouter } from 'expo-router'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/COnfigs/FirebaseConfig';
const login = () => {
	const router = useRouter()
	const user = auth.currentUser


	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const handleSignin = () => {
		if (!email && !password) {
			ToastAndroid.show("Please Enter all Detail", ToastAndroid.LONG)
			return;
		}
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				router.replace('/mytrip')
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode);
				// console.log(errorMessage);
				if (errorCode == 'auth/invalid-credential'|| error) {
					ToastAndroid.showWithGravity(
						"Invalid Credential",
						ToastAndroid.SHORT,
						ToastAndroid.TOP
					);
				}
				
			});
	}

	
	useEffect(() => {
		if (user) {
			router.replace('/mytrip')
		}
	}, [user])
	
	return (
		<>
{/* {
user ? <Redirect href={'/mytrip'}/> 
:
 */}




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
				>Let's SignIn you in </Text>
				<Text
					style={{
						fontFamily: 'Poppins-Regular',
						fontSize: 30,
						color: '#808080',
						marginTop: 20
					}}
				>Welcome Back</Text>


				<View style={{ marginTop: 50 }}>
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
				onPress={handleSignin}
				style={{ padding: 20, backgroundColor: 'black', borderRadius: 15, marginTop: 20, borderWidth: 1 }}>
					<Text style={{ color: 'white', textAlign: 'center' }}>
						Login
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {
					router.replace('auth/signup')
				}} style={{ padding: 20, backgroundColor: 'white', borderRadius: 15, marginTop: 20, borderWidth: 1 }}>
					<Text style={{ color: 'black', textAlign: 'center' }}>
						Create Account
					</Text>
				</TouchableOpacity>
			</View> 
{/* } */}
		</>
	)
}

export default login



const styles = StyleSheet.create({
	input: {
		padding: 15,
		borderWidth: 1,
		borderRadius: 15,
		borderColor: 'gray'

	}
})