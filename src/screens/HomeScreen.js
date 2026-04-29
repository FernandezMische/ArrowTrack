import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';
import { initNFC, stopNFC } from '../utils/nfcHelper';

export default function HomeScreen({ navigation }) {
  
  useEffect(() => {
    initNFC();
    return () => {
      stopNFC();
    };
  }, []);
  
  const showDisclaimer = () => {
    Alert.alert(
      '⚠️ Demo Mode',
      'This is a conceptual demonstration app.\n\n' +
      'Not affiliated with Golden Arrow Bus Services.\n' +
      'Route data is for illustrative purposes only.\n\n' +
      'For safety, do not use this app while driving or crossing roads.',
      [{ text: 'I Understand' }]
    );
  };
  
  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>🚌 ArrowTrack</Text>
        <Text style={{ color: 'white', marginTop: 5 }}>Cape Town's Smarter Bus App</Text>
      </View>
      
      <View style={{ padding: 16 }}>
        <TouchableOpacity 
          style={globalStyles.button}
          onPress={() => navigation.navigate('TripPlanner')}
        >
          <Text style={globalStyles.buttonText}>🗺️ Plan a Trip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[globalStyles.button, { backgroundColor: colors.secondary, marginTop: 12 }]}
          onPress={() => navigation.navigate('TopUp')}
        >
          <Text style={globalStyles.buttonText}>💳 Top Up Clip Card</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[globalStyles.button, { backgroundColor: colors.dark, marginTop: 12 }]}
          onPress={() => navigation.navigate('DriverTrack')}
        >
          <Text style={globalStyles.buttonText}>🚍 Driver Beta Mode</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[globalStyles.button, { backgroundColor: colors.gray, marginTop: 12 }]}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={globalStyles.buttonText}>⭐ My Saved Routes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={{ marginTop: 20, alignItems: 'center' }}
          onPress={showDisclaimer}
        >
          <Text style={{ color: colors.gray, fontSize: 12 }}>⚠️ Demo Mode - Tap for Info</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}