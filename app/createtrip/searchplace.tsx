import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from '../context/CreateTripContext';

const App = () => {
  const navigation = useNavigation();
  const router = useRouter()
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
      headerStyle: {
        backgroundColor: 'white'
      },
      headerTintColor: 'black'
    });
  }, []);

  const { tripData, setTripData } = useContext(CreateTripContext)


  return (
    <View style={{ height: '100%', marginTop: 80, padding: 20, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 18, fontFamily: "Poppins-Regular" }}>Search for a Places:</Text>


      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API,
          language: 'en', // language of the results
        }}
        fetchDetails={true}
        onPress={(data, details = null) => {
          // console.log( data)
          // console.log(data);

          // console.log(data?.description);
          // console.log(details?.geometry?.location);
          // console.log(details?.url);
          // console.log(details)
          setTripData({
            locationInfo: {
              name: data?.description,
              coordinates: details?.geometry?.location,
              photoRef: details?.photos[0]?.photo_reference,
              url: details?.url
            }

          })
          router.push('/createtrip/select-traveler')
        }}
        onFail={(error) => console.error(error)}
        styles={{
          textInputContainer: {
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 25
          }

        }}
      />
    

    </View>
  );
};


export default App;
