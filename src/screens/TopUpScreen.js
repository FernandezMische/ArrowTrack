import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';
import { getClipCardBalance, updateClipCardBalance } from '../utils/storage';
import { readClipCard, initNFC, stopNFC } from '../utils/nfcHelper';

export default function TopUpScreen() {
  const [balance, setBalance] = useState(0);
  const [cardId, setCardId] = useState(null);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [scanning, setScanning] = useState(false);
  
  useEffect(() => {
    loadBalance();
    initNFC();
    
    return () => {
      stopNFC();
    };
  }, []);
  
  const loadBalance = async () => {
    const card = await getClipCardBalance();
    setBalance(card.balance);
    setCardId(card.cardId);
  };
  
  const scanClipCard = async () => {
    setScanning(true);
    const result = await readClipCard();
    
    if (result.success) {
      Alert.alert('Card Detected', `Clip Card ID: ${result.cardId}`);
      setCardId(result.cardId);
    } else {
      Alert.alert('Error', 'Could not read NFC tag. Hold your Clip Card near the phone.');
    }
    
    setScanning(false);
  };
  
  const handleTopUp = async () => {
    const amount = parseFloat(topUpAmount);
    
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }
    
    if (!cardId) {
      Alert.alert('No Card', 'Please scan your Clip Card first');
      return;
    }
    
    Alert.alert(
      'Payment Simulation',
      `Amount: R${amount.toFixed(2)}\n\nThis is a demo. In production, PayFast would process payment.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm Demo Payment',
          onPress: async () => {
            const newBalance = balance + amount;
            await updateClipCardBalance(newBalance);
            setBalance(newBalance);
            Alert.alert('Success', `R${amount.toFixed(2)} added to your Clip Card!\nNew balance: R${newBalance.toFixed(2)}`);
            setTopUpAmount('');
          }
        }
      ]
    );
  };
  
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>💳 Top Up Clip Card</Text>
      </View>
      
      <View style={globalStyles.card}>
        <Text style={[globalStyles.label, { fontSize: 18, textAlign: 'center' }]}>
          Current Balance
        </Text>
        <Text style={{ fontSize: 48, fontWeight: 'bold', textAlign: 'center', color: colors.primary, marginVertical: 10 }}>
          R{balance.toFixed(2)}
        </Text>
        
        {cardId && (
          <Text style={{ textAlign: 'center', color: colors.gray, fontSize: 12 }}>
            Card: {cardId}
          </Text>
        )}
      </View>
      
      <View style={globalStyles.card}>
        <TouchableOpacity 
          style={[globalStyles.button, { backgroundColor: colors.secondary }]} 
          onPress={scanClipCard}
          disabled={scanning}
        >
          <Text style={globalStyles.buttonText}>
            {scanning ? '🔍 Scanning...' : '📱 Tap to Scan Clip Card'}
          </Text>
        </TouchableOpacity>
        
        <Text style={[globalStyles.label, { marginTop: 20 }]}>Top Up Amount (R)</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Enter amount..."
          keyboardType="numeric"
          value={topUpAmount}
          onChangeText={setTopUpAmount}
        />
        
        <TouchableOpacity style={globalStyles.button} onPress={handleTopUp}>
          <Text style={globalStyles.buttonText}>Add Funds (Demo)</Text>
        </TouchableOpacity>
      </View>
      
      <View style={globalStyles.card}>
        <Text style={{ fontSize: 14, color: colors.gray, textAlign: 'center' }}>
          ℹ️ Demo Mode: Payment is simulated. No real money is charged.
          {!cardId && "\n\nTap 'Scan Clip Card' to simulate reading an NFC card."}
        </Text>
      </View>
    </View>
  );
}