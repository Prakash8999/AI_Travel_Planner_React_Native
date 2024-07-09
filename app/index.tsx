import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
const router = useRouter()

  return (
    <View>
      <Image
        source={require('@/assets/images/firstpage.jpg')}

        style={{
          width: '100%',
          height: 500,


        }}
        resizeMode="cover"
      />


      <View style={styles.container}>
        <Text style={{
          fontSize: 28,
          fontFamily: 'Poppins-Bold',
          textAlign: 'center'
        }}>
          Ai Travel Planer
        </Text>
        <Text style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 17,
          textAlign: 'center',
          color: '#808080'
        }}>
          "Discover your next adventure effortlessly. Personalized itineraries at your fingertips. Travel smarter with AI-Driven Insights."
        </Text>

        <TouchableOpacity style={styles.buttons} onPress={()=>router.push('auth/login')}>
          <Text style ={{color: 'white',fontSize: 15,fontFamily: 'Poppins-Regular',  textAlign: 'center'}}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    height: '100%',
    padding: 15
  },
  buttons: {
    padding: 15,
    backgroundColor: '#000000',
    borderRadius: 99,
    marginTop: 20
  }
})
