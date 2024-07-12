
import { View, Text, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { CreateTripContext } from '../context/CreateTripContext';
import { AI_PROMPT } from '@/constants/Options';
import { chatSession } from '@/Configs/AiGeminiConfig';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/Configs/FirebaseConfig';
import { useRouter } from 'expo-router';

const generatetrip = () => {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const totalNumberOfDays = parseInt(tripData.totalNumberOfDays, 10);
  const daysMinusOne = totalNumberOfDays - 1;
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
 GenerateAiTrip()
  }, [])
  const GenerateAiTrip = async () => {
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace('{location}', tripData.locationInfo?.name)
      .replace('{totalDays}', tripData?.totalNumberOfDays)
      .replace('{totalNight}', daysMinusOne.toString())
      .replace('{traveler}', tripData?.traveler?.title)
      .replace('{budget}', tripData?.budget)
      .replace('{totalDays}', tripData?.totalNumberOfDays)
      .replace('{totalNight}', daysMinusOne.toString());

    console.log(FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result.response.text();
      console.log("Response Text:", responseText);
      console.log("Email:", user?.email);

      let tripResponse;
      try {
        // Extract JSON content using a regular expression
        const jsonString = responseText.match(/\{.*\}/s);
        if (jsonString) {
          tripResponse = JSON.parse(jsonString[0]);
          console.log("Parsed Trip Response:", tripResponse);
        } else {
          throw new Error('No JSON found in response text');
        }
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        setLoading(false);
        return;
      }

      try {
        const docId = (Date.now()).toString();
        const fbResult = await setDoc(doc(db, "UserTrips", docId), {
          userId: user?.uid,
          userEmail: user?.email,
          tripPlane: tripResponse,
          tripData: JSON.stringify(tripData),
          docId: docId
        });
        console.log("Firebase Result:", fbResult);

        router.replace('/mytrip');
      } catch (firebaseError) {
        console.error('Error writing to Firebase:', firebaseError);
      }
    } catch (error) {
      console.error('Error during chat session:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <View style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: 'white',
        height: '100%',
      }}>
        <Text style={{
          fontFamily: 'Poppins-Bold',
          fontSize: 35,
          textAlign: 'center',
        }}>
          Please Wait...
        </Text>
        <Text style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 20,
          textAlign: 'center',
          marginTop: 20,
          position: 'relative'
        }}>
          We are working to generate your trip.
        </Text>
        <View style={{ flexDirection: 'column', alignItems: 'center', position: 'relative', marginTop: -80 }}>

          <Image
            source={require('@/assets/images/travel_loading.gif')}
            style={{
              width: '100%',
              height: 450,
              resizeMode: "cover",
              zIndex: -1
            }}
          />
          <Text style={{
            fontFamily: 'Poppins-Regular',
            color: 'gray',
            fontSize: 20,
            textAlign: 'center',
            marginTop: -80,
          }}>
            Do Not Go Back.
          </Text>
        </View>
      </View>
    </>
  );
}

export default generatetrip;
