// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './views/Welcome.js';
import MenuScreen from './views/MenuScreen.js';
import GalleryScreen from './views/GalleryScreen';
import ApartmentsScreen from './views/sections/ApartamentsScreen';
import ContactScreen from './views/sections/ContactScreen';
import ApartmentDetailScreen from './views/sections/ApartmentDetailScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen name="Apartments" component={ApartmentsScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="ApartmentDetail" component={ApartmentDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
