import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';

export default function RouteCard({ route, onPress, onSave }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.routeName}>{route.name}</Text>
      <Text style={styles.routeDetail}>⏱️ Duration: {route.duration}</Text>
      <Text style={styles.routeDetail}>💰 Price: {route.price}</Text>
      <Text style={styles.stopCount}>
        🚏 {route.stops.length} bus stops
      </Text>
      {onSave && (
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>⭐ Save Route</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  routeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.dark
  },
  routeDetail: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4
  },
  stopCount: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 8
  },
  saveButton: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center'
  },
  saveButtonText: {
    color: colors.primary,
    fontWeight: '500'
  }
});