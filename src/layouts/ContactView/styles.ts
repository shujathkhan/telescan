import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 30,
  },
  nameIcon: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginRight: 15,
  },
  nameInitialsView: {
    borderRadius: 100,
    padding: 45,
    backgroundColor: `rgb(0,0 , ${Math.floor(Math.random() * 256)} )`,
    marginEnd: 15,
  },
  nameInitialsText: { fontSize: 50, color: 'white' },
});
