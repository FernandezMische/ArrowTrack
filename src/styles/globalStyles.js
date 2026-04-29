import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#FF8C00',
  primaryDark: '#E07800',
  secondary: '#4CAF50',
  danger: '#f44336',
  warning: '#FFC107',
  dark: '#333333',
  gray: '#666666',
  lightGray: '#f5f5f5',
  white: '#ffffff',
  border: '#dddddd'
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 50,
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    margin: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.white,
    marginBottom: 12
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: colors.dark
  }
});