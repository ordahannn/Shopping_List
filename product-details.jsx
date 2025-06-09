import { useLocalSearchParams, Stack } from "expo-router";
import {  SafeAreaView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { departmentMapping } from "@/constants/departmentMapping";
import GoBackButton from "@/components/ui/GoBackButton";
import { useThemeColor } from '@/hooks/useThemeColor';
import styles from '@/styles/product-details-styles';

export default function ProductDetailsScreen() {
  const { item } = useLocalSearchParams(); // Retrieve the product data
  const product = JSON.parse(item); // Convert string back into an object

  const backgroundColor = useThemeColor({}, 'background');

  return (
    <>
    {/* Hide Top Bar */}
    <Stack.Screen options={{ headerShown: false }} />
    
    <SafeAreaView style={{ flex: 1 , backgroundColor: backgroundColor}}>
      {/* Go Back Button */}
      <GoBackButton 
        link="/shopping-list" 
        text="Back to Shopping List" 
      />
      <ThemedView style={[styles.container, { backgroundColor }]}>
        {/* Page Title */}
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Product Details</ThemedText>
        </ThemedView>

        {/* Product Details */}
        <ThemedView style={styles.detailsContainer}>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle" style={styles.productTitle}>Product:</ThemedText>
            <ThemedText>{product.name}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Department:</ThemedText>
            <ThemedText>{departmentMapping[product.emoji] || "Other"} {product.emoji}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Description:</ThemedText>
            <ThemedText>{product.description}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>  
    </>
  );
}
