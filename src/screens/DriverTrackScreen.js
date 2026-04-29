import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { globalStyles, colors } from '../styles/globalStyles';
import { saveTripLog } from '../utils/storage';

export default function DriverTrackScreen() {
  const [isTracking, setIsTracking] = useState(false);
  const [tripLog, setTripLog] = useState([]);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState(null);
  
  const availableRoutes = [
    {
      id: '101',
      name: 'Route 101: Durbanville → Cape Town',
      stops: [
        { id: 1, name: 'Durbanville Station', lat: -33.8313, lng: 18.6469, scheduled: '06:00' },
        { id: 2, name: 'Bellville Transport Hub', lat: -33.9064, lng: 18.6329, scheduled: '06:30' },
        { id: 3, name: 'Civic Centre, Cape Town', lat: -33.9249, lng: 18.4241, scheduled: '07:15' }
      ]
    },
    {
      id: '205',
      name: 'Route 205: Mitchells Plain → Cape Town',
      stops: [
        { id: 1, name: 'Mitchells Plain Station', lat: -34.0536, lng: 18.6102, scheduled: '05:30' },
        { id: 2, name: 'Canal Walk', lat: -33.8684, lng: 18.5046, scheduled: '06:15' },
        { id: 3, name: 'Civic Centre, Cape Town', lat: -33.9249, lng: 18.4241, scheduled: '06:45' }
      ]
    }
  ];
  
  const selectRoute = (route) => {
    setSelectedRoute(route);
    Alert.alert('Route Selected', route.name);
  };
  
  const startTrip = () => {
    if (!selectedRoute) {
      Alert.alert('No Route', 'Please select a route first');
      return;
    }
    setIsTracking(true);
    setTripLog([]);
    setCurrentStopIndex(0);
    Alert.alert('Trip Started', `You are now tracking ${selectedRoute.name}`);
  };
  
  const endTrip = async () => {
    const tripSummary = {
      routeName: selectedRoute?.name || 'Unknown Route',
      date: new Date().toISOString(),
      stopsRecorded: tripLog.length,
      logs: tripLog
    };
    
    await saveTripLog(tripSummary);
    setIsTracking(false);
    Alert.alert('Trip Ended', `Recorded ${tripLog.length} stops on this trip`);
  };
  
  const recordStop = () => {
    if (!selectedRoute) return;
    
    const now = new Date();
    const currentStop = selectedRoute.stops[currentStopIndex];
    
    const logEntry = {
      stopName: currentStop.name,
      scheduledTime: currentStop.scheduled,
      actualTime: now.toLocaleTimeString(),
      timestamp: now.toISOString()
    };
    
    setTripLog([...tripLog, logEntry]);
    
    if (currentStopIndex + 1 < selectedRoute.stops.length) {
      setCurrentStopIndex(currentStopIndex + 1);
      Alert.alert('Stop Recorded', `Arrived at ${currentStop.name}`);
    } else {
      Alert.alert('Trip Complete', 'You have reached the final stop!');
      endTrip();
    }
  };
  
  const getRouteCoordinates = () => {
    if (!selectedRoute) return [];
    return selectedRoute.stops.map(stop => ({
      latitude: stop.lat,
      longitude: stop.lng
    }));
  };
  
  return (
    <View style={globalStyles.container}>
      {!isTracking ? (
        <ScrollView>
          <View style={globalStyles.header}>
            <Text style={globalStyles.headerTitle}>🚍 Driver Beta Mode</Text>
            <Text style={{ color: 'white', fontSize: 12, marginTop: 5 }}>
              Track routes in real-time
            </Text>
          </View>
          
          <View style={globalStyles.card}>
            <Text style={globalStyles.label}>Select a Route</Text>
            {availableRoutes.map((route) => (
              <TouchableOpacity
                key={route.id}
                style={[
                  { padding: 12, borderRadius: 8, marginVertical: 5, borderWidth: 1, borderColor: colors.border },
                  selectedRoute?.id === route.id && { backgroundColor: colors.primary + '20', borderColor: colors.primary }
                ]}
                onPress={() => selectRoute(route)}
              >
                <Text style={{ fontWeight: '500' }}>{route.name}</Text>
                <Text style={{ fontSize: 12, color: colors.gray, marginTop: 3 }}>
                  {route.stops.length} bus stops
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity 
            style={[globalStyles.button, { backgroundColor: colors.secondary, margin: 16 }]} 
            onPress={startTrip}
          >
            <Text style={globalStyles.buttonText}>▶ Start Trip</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: -33.9,
              longitude: 18.55,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5
            }}
          >
            {selectedRoute && selectedRoute.stops.map((stop, index) => (
              <Marker
                key={stop.id}
                coordinate={{ latitude: stop.lat, longitude: stop.lng }}
                title={stop.name}
                description={`Scheduled: ${stop.scheduled} | ${index === currentStopIndex ? 'CURRENT STOP' : ''}`}
                pinColor={index === currentStopIndex ? '#4CAF50' : '#FF8C00'}
              />
            ))}
            
            {selectedRoute && (
              <Polyline
                coordinates={getRouteCoordinates()}
                strokeColor="#FF8C00"
                strokeWidth={4}
              />
            )}
          </MapView>
          
          <View style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
              {selectedRoute?.stops[currentStopIndex]?.name}
            </Text>
            <Text style={{ fontSize: 12, textAlign: 'center', color: colors.gray, marginBottom: 12 }}>
              Scheduled: {selectedRoute?.stops[currentStopIndex]?.scheduled}
            </Text>
            
            <TouchableOpacity 
              style={{ backgroundColor: colors.primary, padding: 14, borderRadius: 8, marginBottom: 8 }}
              onPress={recordStop}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>
                ⏹️ Arrived at Stop
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={{ backgroundColor: colors.danger, padding: 12, borderRadius: 8 }}
              onPress={endTrip}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                ■ End Trip
              </Text>
            </TouchableOpacity>
          </View>
          
          {tripLog.length > 0 && (
            <View style={{
              position: 'absolute',
              top: 60,
              left: 10,
              right: 10,
              backgroundColor: 'rgba(0,0,0,0.8)',
              borderRadius: 8,
              padding: 10,
              maxHeight: 120
            }}>
              <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 5 }}>
                Trip Log ({tripLog.length}/{selectedRoute?.stops.length})
              </Text>
              <ScrollView>
                {tripLog.map((entry, index) => (
                  <Text key={index} style={{ color: '#ccc', fontSize: 11, marginBottom: 2 }}>
                    {entry.stopName}: Scheduled {entry.scheduledTime} → Actual {entry.actualTime}
                  </Text>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      )}
    </View>
  );
}