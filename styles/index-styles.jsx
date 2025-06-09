import { StyleSheet } from 'react-native';

const indexStyles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'col',
    padding: 20,
    height: '100%',
    alignItems: 'center',
  },
  cartIconContainer: {
    width: '100%',
    marginTop: 100,
    alignItems: 'center',
  },
  cartIcon: {
    width: 150,
    height: 105,
  },
  hello: {
    textAlign: 'center',
  },
  texts: {
    marginTop: 100,
  },
  itemCount: {
    marginTop: 30,
    textAlign: 'center',
  }
});

export default indexStyles;
