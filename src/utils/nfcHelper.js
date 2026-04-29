import NfcManager, { NfcTech } from 'react-native-nfc-manager';

export const initNFC = async () => {
  try {
    await NfcManager.start();
    return true;
  } catch (error) {
    console.error('Error starting NFC:', error);
    return false;
  }
};

export const stopNFC = async () => {
  try {
    await NfcManager.stop();
    return true;
  } catch (error) {
    console.error('Error stopping NFC:', error);
    return false;
  }
};

export const readClipCard = async () => {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef, {
      alertMessage: 'Hold your Clip Card near the phone'
    });
    
    const tag = await NfcManager.getTag();
    
    let cardData = {
      cardId: tag.id || 'UNKNOWN_CARD',
      success: true
    };
    
    if (tag.ndefMessage && tag.ndefMessage.length > 0) {
      const record = tag.ndefMessage[0];
      if (record.payload) {
        const payload = new Uint8Array(record.payload);
        const decoded = String.fromCharCode.apply(null, payload);
        cardData.data = decoded;
      }
    }
    
    return cardData;
  } catch (error) {
    console.error('Error reading NFC:', error);
    return { success: false, error: error.message };
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
};