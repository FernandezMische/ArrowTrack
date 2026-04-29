import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';
import RouteCard from '../components/RouteCard';
import routeData from '../data/routes.json';
import { saveFavorite } from '../utils/storage';

export default function TripPlannerScreen() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  
  const searchRoutes = () => {
    if (!fromLocation.trim() || !toLocation.trim()) {
      Alert.alert('Missing Info', 'Please enter both locations');
      return;
    }
    
    const foundRoutes = [];
    
    routeData.routes.forEach(route => {
      const hasFrom = route.stops.some(stop => 
        stop.name.toLowerCase().includes(fromLocation.toLowerCase())
      );
      const hasTo = route.stops.some(stop => 
        stop.name.toLowerCase().includes(toLocation.toLowerCase())
      );
      
      if (hasFrom && hasTo) {
        foundRoutes.push(route);
      }
    });
    
    setResults(foundRoutes);
    setSearched(true);
    
    if (foundRoutes.length === 0) {
      Alert.alert('No Routes Found', 'Try different locations or check spelling');
    }
  };
  
  const handleSaveRoute = (route) => {
    saveFavorite(route);
    Alert.alert('Saved!', `${route.name} added to favorites`);
  };
  
  const showRouteDetails = (route) => {
    let stopsList = route.stops.map((stop, index) => 
      `${index + 1}. ${stop.name}\n   Times: ${stop.times.join(', ')}`
    ).join('\n\n');
    
    Alert.alert(
      route.name,
      `Duration: ${route.duration}\nPrice: ${route.price}\n\n🚏 Bus Stops:\n${stopsList}`,
      [{ text: 'OK' }]
    );
  };
  
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>Plan Your Trip</Text>
      </View>
      
      <ScrollView style={{ flex: 1 }}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.label}>📍 From</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Enter starting location..."
            value={fromLocation}
            onChangeText={setFromLocation}
          />
          
          <Text style={globalStyles.label}>🎯 To</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Enter destination..."
            value={toLocation}
            onChangeText={setToLocation}
          />
          
          <TouchableOpacity style={globalStyles.button} onPress={searchRoutes}>
            <Text style={globalStyles.buttonText}>Find Routes</Text>
          </TouchableOpacity>
        </View>
        
        {searched && results.length > 0 && (
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
              {results.length} Route{results.length !== 1 ? 's' : ''} Found
            </Text>
            {results.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                onPress={() => showRouteDetails(route)}
                onSave={() => handleSaveRoute(route)}
              />
            ))}
          </View>
        )}
        
        {searched && results.length === 0 && (
          <View style={globalStyles.card}>
            <Text style={{ textAlign: 'center', color: colors.gray }}>
              No routes found. Try different locations.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}