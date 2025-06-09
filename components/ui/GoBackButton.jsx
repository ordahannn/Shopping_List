import { Link } from "expo-router";
import { View, StyleSheet, Platform } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Feather } from '@expo/vector-icons';

export default function GoBackButton({ link='/', text='', lightColor='#fff', darkColor='#151718' }) {
  return (
    <ThemedView 
      style={styles.header}
      lightColor={lightColor}
      darkColor={darkColor}
    >
      <Link href={link}>
        <View 
            style={[
                styles.goBackContainer,
                Platform.OS === "web" && styles.webContainer
            ]}
        >
          <ThemedText type="link"><Feather name="arrow-left-circle" size={16}/></ThemedText>
          {text !== '' && text !== null && <ThemedText type="link" style={styles.goBackText}>{text}</ThemedText>}
        </View>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 32,
    paddingVertical: 16,
  },
  goBackContainer: {
    flexDirection: "row", // Ensures icon & text are in the same row
    alignItems: "center", // Aligns them vertically
  },
  webContainer: {
    flex: 1,
    paddingLeft: 32,
  },
  goBackText: {
    marginLeft: 8, // Adds space between the icon & text
  },
});
