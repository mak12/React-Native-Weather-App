import { StyleSheet } from 'react-native'
import { Dimension } from '../../ui-kit';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    marginBottom: 16
  },
  smallIcon: {
    width: 100,
    height: 100,
  },
  largeIcon: {
    width: 250,
    height: 200,
  },
  hour: {
    padding: 6,
    alignItems: 'center',
  },
});