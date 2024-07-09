import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { CreateTripContext, CreateTripProvider } from "./context/CreateTripContext";
import { useState } from "react";

export default function RootLayout() {
  useFonts({
    'Poppins-Bold' : require('@/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Italic' : require('@/assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Light' : require('@/assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium' : require('@/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular' : require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Thin' : require('@/assets/fonts/Poppins-Thin.ttf'),
    
  })

  const [tripData, setTripData] = useState<any>([])
  return (
    <CreateTripProvider>

    <Stack>
      <Stack.Screen name="index"  options={{headerShown:false}}/>
      <Stack.Screen name="auth/login"  options={{headerShown:false}}/>
      <Stack.Screen name="auth/signup"  options={{headerShown:false}}/>
      <Stack.Screen name="(tabs)"  options={{headerShown:false}}/>  
      <Stack.Screen name="createtrip/searchplace"  options={{headerShown:false}}/>  
      <Stack.Screen name="createtrip/selectdates"  options={{headerShown:false}}/>  
      <Stack.Screen name="createtrip/generatetrip"  options={{headerShown:false}}/>  
    </Stack>
    </CreateTripProvider>
  );
}
