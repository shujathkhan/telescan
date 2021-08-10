import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ACFCD9',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  nameIcon: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 15,
  },
  nameInitialsView: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: `rgb(0,${Math.floor(Math.random() * 256)} , ${Math.floor(
      Math.random() * 256,
    )} )`,
    marginEnd: 15,
  },
  nameInitialsText: { fontSize: 20, color: 'white' },
  nameView: {
    height: 'auto',
    maxHeight: '75%',
    width: 'auto',
    maxWidth: '80%',
  },
  nameText: { fontSize: 25, width: '100%', overflow: 'hidden' },
});
