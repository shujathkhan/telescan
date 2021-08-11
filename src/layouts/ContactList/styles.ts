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
});
