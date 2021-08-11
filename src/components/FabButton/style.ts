import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fabButton: {
    backgroundColor: 'lime',
    padding: 15,
    borderRadius: 100,
    elevation: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 25,
    zIndex: 999,
  },
  fabText: {
    fontSize: 20,
  },
  fabPencilButton: {
    transform: [{ rotateZ: '90deg' }],
  },
});
