import { Dimensions, StyleSheet } from 'react-native';

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
  detailsContainer: {
    marginVertical: 50,
    width: '85%',
    marginBottom: 0,
  },
  detailsView: { marginVertical: 10 },
  detailsTextLabel: {
    fontSize: 15,
    color: 'grey',
  },
  detailsTextValue: { fontSize: 25 },
  detailsTextInput: {
    fontSize: 25,
    height: 50,
    width: Dimensions.get('screen').width - 65,
    borderBottomWidth: 0.75,
    paddingBottom: 2,
    paddingLeft: 0,
    marginTop: -10,
  },
  fabView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
