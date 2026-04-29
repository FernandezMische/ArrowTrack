import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@arrowtrack_favorites';
const TRIP_LOGS_KEY = '@arrowtrack_trip_logs';
const CLIP_CARD_KEY = '@arrowtrack_clip_card';

export const saveFavorite = async (route) => {
  try {
    const existing = await getFavorites();
    const exists = existing.some(r => r.id === route.id);
    if (!exists) {
      const updated = [...existing, route];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    }
    return true;
  } catch (error) {
    console.error('Error saving favorite:', error);
    return false;
  }
};

export const getFavorites = async () => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const removeFavorite = async (routeId) => {
  try {
    const existing = await getFavorites();
    const updated = existing.filter(route => route.id !== routeId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
};

export const saveTripLog = async (tripLog) => {
  try {
    const existing = await getTripLogs();
    const updated = [tripLog, ...existing];
    await AsyncStorage.setItem(TRIP_LOGS_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error saving trip log:', error);
    return false;
  }
};

export const getTripLogs = async () => {
  try {
    const data = await AsyncStorage.getItem(TRIP_LOGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting trip logs:', error);
    return [];
  }
};

export const getClipCardBalance = async () => {
  try {
    const data = await AsyncStorage.getItem(CLIP_CARD_KEY);
    return data ? JSON.parse(data) : { balance: 50.00, cardId: 'DEMO_CARD_001' };
  } catch (error) {
    console.error('Error getting balance:', error);
    return { balance: 50.00, cardId: 'DEMO_CARD_001' };
  }
};

export const updateClipCardBalance = async (newBalance) => {
  try {
    const card = await getClipCardBalance();
    card.balance = newBalance;
    await AsyncStorage.setItem(CLIP_CARD_KEY, JSON.stringify(card));
    return true;
  } catch (error) {
    console.error('Error updating balance:', error);
    return false;
  }
};