
import { View, Text, Image } from 'react-native';
import React from 'react';

const generatetrip = () => {
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
          position:'relative'
        }}>
          We are working to generate your trip.
        </Text>
        <View style={{ flexDirection: 'column', alignItems: 'center', position:'relative', marginTop:-80 }}>

          <Image
            source={require('@/assets/images/travel_loading.gif')}
            style={{
              width: '100%',
              height: 450,
              resizeMode: "cover",
              zIndex:-1
            }}
          />
          <Text style={{
            fontFamily: 'Poppins-Regular',
            color: 'gray',
            fontSize: 20,
            textAlign: 'center',
            marginTop:-80 ,
          }}>
            Do Not Go Back.
          </Text>
        </View>
      </View>
    </>
  );
}

export default generatetrip;
