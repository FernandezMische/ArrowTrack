import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Alert, RefreshControl } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';
import RouteCard from '../components/RouteCard';
import { getFavorites, removeFavorite } from '../utils/storage';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const loadFavorites = useCallback(async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  }, []);
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  }, [loadFavorites]);
  
  const handleRemoveFavorite = (route) => {
    Alert.alert(
      'Remove Favorite',
      `Remove ${route.name} from favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: async () => {
            await removeFavorite(route.id);
            await loadFavorites();
            Alert.alert('Removed', 'Route removed from favorites');
          }
        }
      ]
    );
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
  
  React.useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);
  
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>⭐ Saved Routes</Text>
      </View>
      
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {favorites.length === 0 ? (
          <View style={globalStyles.card}>
            <Text style={{ textAlign: 'center', color: colors.gray }}>
              No saved routes yet.
            </Text>
            <Text style={{ textAlign: 'center', color: colors.gray, marginTop: 8 }}>
              Plan a trip and tap "Save Route"
            </Text>
          </View>
        ) : (
          <View style={{ padding: 16 }}>
            {favorites.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                onPress={() => showRouteDetails(route)}
                onSave={() => handleRemoveFavorite(route)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}