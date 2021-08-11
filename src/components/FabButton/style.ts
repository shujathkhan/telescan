import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fabButton: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#61dafb',
    borderWidth: 0.05,
    padding: 10,
    transform: [{ rotateZ: '90deg' }],
    borderRadius: 100,
    elevation: 3,
  },
  fabText: {
    fontSize: 20,
  },
});
