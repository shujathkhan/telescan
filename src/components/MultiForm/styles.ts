import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFFBDF',
  },
  groupContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 40,
  },

  detailsView: { marginVertical: 10 },
  detailsTextLabel: {
    fontSize: 15,
    color: 'grey',
  },
  detailsTextValue: { fontSize: 25 },
  detailsTextInput: {
    fontSize: 15,
    height: 50,
    width: Dimensions.get('screen').width - 65,
    borderBottomWidth: 0.75,
    paddingBottom: 2,
    paddingLeft: 0,
    marginTop: -10,
    color: 'black',
  },

  emojiContainer: { flexDirection: 'row', alignItems: 'baseline' },
  emoji: { marginRight: 10 },
  itemContainer: {
    flexDirection: 'row',
  },
  pickerContainer: {
    marginLeft: '-2.5%',
    marginRight: '5%',
    height: 50,
    width: '45%',
  },
  pickerItem: { backgroundColor: '#FFFBDF', color: 'black' },
  customTextInput: { width: '100%', height: 50, borderBottomWidth: 0.75, marginTop: -40, paddingLeft: 0, marginStart: -25, fontSize: 15 },
  fallbackTypeView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
