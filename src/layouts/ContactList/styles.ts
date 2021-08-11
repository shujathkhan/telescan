import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    minHeight: 70,
  },
  fallbackStatusView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackStatusText: {
    fontSize: 15,
  },
  infoContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 3,
    marginBottom: 5,
  },
  infoText: { fontSize: 15 },
  typeOfView: {
    flexDirection: 'row',
    borderRadius: 5,
    width: 80,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#61dafbb0',
    alignItems: 'center',
  },
  separator: {
    borderWidth: 0.75,
    height: 25,
    marginHorizontal: 10,
  },
  fabView: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
