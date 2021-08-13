import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 30,
    paddingHorizontal: '7.5%',
    backgroundColor: '#FFFBDF',
  },
  groupContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  pickerContainer: {
    marginLeft: '-5%',
    height: 50,
    width: '50%',
  },
  pickerItem: { backgroundColor: '#FFFBDF', color: 'black' },
  customTextInput: { width: '120%', borderBottomWidth: 0.75, marginTop: -40, marginStart: -25 },

  fabView: {
    position: 'absolute',
    bottom: '4%',
    right: '5%',
  },
});
