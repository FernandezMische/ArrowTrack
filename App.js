import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import TripPlannerScreen from './src/screens/TripPlannerScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import TopUpScreen from './src/screens/TopUpScreen';
import DriverTrackScreen from './src/screens/DriverTrackScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#FF8C00' },
            headerTintColor: '#ffffff',
            headerTitleStyle: { fontWeight: 'bold' }
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'ArrowTrack' }}
          />
          <Stack.Screen 
            name="TripPlanner" 
            component={TripPlannerScreen} 
            options={{ title: 'Plan Your Trip' }}
          />
          <Stack.Screen 
            name="Favorites" 
            component={FavoritesScreen} 
            options={{ title: 'My Saved Routes' }}
          />
          <Stack.Screen 
            name="TopUp" 
            component={TopUpScreen} 
            options={{ title: 'Top Up Clip Card' }}
          />
          <Stack.Screen 
            name="DriverTrack" 
            component={DriverTrackScreen} 
            options={{ title: 'Driver Beta' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}