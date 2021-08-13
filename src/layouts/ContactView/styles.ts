import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFFBDF',
    width: '100%',
  },
  nameIcon: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginRight: 15,
  },
  nameInitialsView: {
    borderRadius: 100,
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `rgb(0,0 , ${Math.floor(Math.random() * 256)} )`,
    marginEnd: 15,
  },
  nameInitialsText: { fontSize: 50, color: 'white' },
  detailsContainer: {
    marginVertical: 30,
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
    fontSize: 15,
    height: 50,
    width: Dimensions.get('screen').width - 65,
    borderBottomWidth: 0.75,
    paddingBottom: 2,
    paddingLeft: 0,
    marginTop: -10,
    color: 'black',
  },
  fabView: {
    position: 'absolute',
    bottom: '4%',
    right: '5%',
  },
  editPhotoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '-4%',
    marginTop: 10,
  },
  editPhotoButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editPhotoButton: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiContainer: { flexDirection: 'row', alignItems: 'baseline' },
  emoji: { marginRight: 10 },
});
