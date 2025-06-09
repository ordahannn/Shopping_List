import { StyleSheet } from 'react-native';

const shoppingListStyles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
    },
    webContainer: {
      flex: 1,
      paddingHorizontal: 64,
      paddingBottom: 30,
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8,
      padding: 10,
      marginVertical: 5,
    },
    sectionHeader: {
      marginTop: 30,
      marginBottom: 10,
    },
     item: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between", // Ensures elements are spread evenly
      padding: 6,
      marginVertical: 5,
      borderRadius: 5,
      marginLeft: 24,
    },
    itemDetailsContainer: {
      flexDirection: "row",
      alignItems: "center", // Ensures alignment in the same line
      justifyContent: "flex-start", // Aligns buttons to the right
      gap: 18, // Adjusts spacing between checkbox and text
    },
    checkboxContainer: {
      alignItems: "center",
      justifyContent: "center",
      height: 24, // Adjust to match icon size
      width: 24, // Ensures square shape for perfect alignment
    },
    itemTitleContainer: {
      alignItems: "center",
      minHeight: 24, // Adjust to match icon size
      maxHeight: 48, // Limits wrapping to 2 lines
    },
    itemTitle: {
      flex: 1,
      fontSize: 18,
      flexWrap: "wrap",
      maxHeight: 48, // Limits wrapping to 2 lines
      overflow: "hidden",
    },
    mobileItemTitle: {
      maxWidth: 180,
    },
    webItemTitle: {
      maxWidth: 500,
    },
    purchasedTitle: {
      textDecorationLine: "line-through",
      color: "gray",
    },
    actionButtonsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end", // Aligns buttons to the right
      gap: 10, // Adds spacing between buttons
    },
    actionButtonText: {
      fontSize: 20,
      padding: 8,
    }
});

export default shoppingListStyles;
  