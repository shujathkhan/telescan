import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fabButton: {
    backgroundColor: '#FFEACA',
    width: 50,
    height: 50,
    borderRadius: 100,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    borderWidth: 2,
  },
  fabText: {
    fontSize: 20,
  },
  fabPencilButton: {
    transform: [{ rotateZ: '90deg' }],
  },
  fabImage: { width: 20, height: 20 },
});
