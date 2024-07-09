import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Entypo, Ionicons } from '@expo/vector-icons';
const _layout = () => {
  return (
<Tabs screenOptions={{
  headerShown:false,
  tabBarActiveTintColor:'black'
  }}>
<Tabs.Screen name='mytrip' 
options={{
  tabBarLabel:'My Trip',
  tabBarIcon:({color}) => <Ionicons name="location" size={24} color={color} />
}}

/>
<Tabs.Screen name='discover' 
options={{
  tabBarLabel:'Discover',
  tabBarIcon:({color}) => <Ionicons name="globe-sharp" size={24} color={color} />

}}
/>
<Tabs.Screen name='profile' 
options={{
  tabBarLabel:'Profile',
  tabBarIcon:({color}) => <Ionicons name="people" size={24} color={color} />
}}/>
</Tabs>
  )
}

export default _layout