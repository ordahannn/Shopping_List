import { StyleSheet } from 'react-native';

const productDetailsStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      height: '100%',
      alignItems: 'center',
    },
    emoji: {
      fontSize: 60,
    },
    titleContainer: {
      marginTop: 40,
      marginBottom: 50,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    detailsContainer: {
      alignItems: 'flex-start', // Align text to the left
    },
    stepContainer: {
      gap: 8,
      marginBottom: 20,
      alignItems: 'flex-start', // Ensure text alignment to the left
    },
    reactLogo: {
      height: 100,
      width: 162,
      bottom: 0,
      left: 0,
      position: 'absolute',
    }
});
  

export default productDetailsStyles;
