import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  groupContainer: {
    marginTop: 25,
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  pickerContainer: {
    marginLeft: -7.5,
    height: 50,
    width: Dimensions.get('screen').width - 265,
  },
  customTextInput: { width: '60%', borderBottomWidth: 0.75 },
  customFabView: {
    right: -30,
  },
});
