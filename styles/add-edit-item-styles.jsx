import { StyleSheet } from 'react-native';

const addEditItemStyles = StyleSheet.create({
    safeContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 20,
      height: '100%',
      alignItems: 'center',
    },
    boldText: {
      fontWeight: 'bold',
    },
    inputColumn: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 80,
      width: '100%',
    },
    inputHalf: {
      padding: 10,
      borderRadius: 5,
      fontSize: 16,
      marginTop: 10,
      width: '90%',
    },
    addCustomItemBtn: {
      alignItems: 'flex-end',
      marginRight: 0,
      padding: 10,
      marginTop: 10,
      width: '15%',
    },
    emoji: {
      paddingTop: 10,
      textAlign: 'center',
      fontSize: 25,
    },
    description: {
      textAlign: 'center',
      marginTop: 20,
    },
    itemView: {
      marginTop: 100,
      width: '100%',
      alignItems: 'center',
    },
    dropdown: {
      width: '100%',
      textAlign: 'left',
      height: 200,
    },
    suggestionsContainer: {
      overflow: 'hidden',
      width: '100%',
      marginTop: 10,
      height: 200,
    },
    itemDetails: {
      height: 'auto',
      padding: 30,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
    buttons: {
      width: '100%',
      alignItems: 'center',
      marginTop: 200,
      width: '100%',
      alignItems: 'center',
    },
    modalInputs: {
      width: '100%',
      alignItems: 'center',
      marginTop: 50,
    },
    saveButton: {
      width: '100%',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 30,
    },
    saveButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    modalButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 100,
    },
    modalButton: {
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
      width: '80%',
    },
    addModalButton: {
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 30,
      width: '80%',
    },
    modalInput: {
      padding: 10,
      borderRadius: 5,
      fontSize: 16,
      marginTop: 10,
      width: '80%',
    },
});

export default addEditItemStyles;