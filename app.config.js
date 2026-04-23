export default {
  name: 'ArrowTrack',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#FF8C00'
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.arrowtrack.app',
    infoPlist: {
      NFCReaderUsageDescription: 'ArrowTrack uses NFC to read and top up your Clip Card balance'
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FF8C00'
    },
    package: 'com.arrowtrack.app',
    permissions: ['NFC']
  },
  plugins: [
    [
      'react-native-maps',
      {
        androidGoogleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
        iosGoogleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
      }
    ]
  ],
  extra: {
    payfastMerchantId: 'YOUR_PAYFAST_MERCHANT_ID',
    payfastMerchantKey: 'YOUR_PAYFAST_MERCHANT_KEY'
  }
}