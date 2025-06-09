import React, { useState, useEffect, useCallback } from "react"; 
import { Platform, SafeAreaView, SectionList, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from "expo-router";import { departmentMapping } from "@/constants/departmentMapping";
import GoBackButton from "@/components/ui/GoBackButton";
import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from '@/styles/shopping-list-styles';

export default function ShoppingListScreen() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  const backgroundColor = useThemeColor({}, 'background');

  /* Load Shopping List from AsyncStorage */
  const loadShoppingList = async () => {
    try {
      const storedList = await AsyncStorage.getItem("shoppingList");
      if (storedList) {  
        setItems(JSON.parse(storedList));
      }
    } catch (error) {
      console.error("Error loading shopping list:", error);
    }
  };

  /* Ensure the list updates when navigating back */
  useFocusEffect(
    useCallback(() => {
      loadShoppingList();
    }, [])
  );

  /* Save Shopping List to AsyncStorage Whenever It Changes */
  useEffect(() => {
    const saveShoppingList = async () => {
      try {
        await AsyncStorage.setItem("shoppingList", JSON.stringify(items));
      } catch (error) {
        console.error("Error saving shopping list:", error);
      }
    };

    saveShoppingList();
  }, [items]);

  /* Function to Toggle Purchased Status */
  const togglePurchased = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    );
    setItems(updatedItems);
  };

  /* Function to Remove an Item */
  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  /* Organizing the List by Department */
  const groupedItems = items.reduce((acc, item) => {
    const department = departmentMapping[item.emoji] || "Other"; // Get department from mapping
    const categoryIndex = acc.findIndex((section) => section.title === department);
    
    if (categoryIndex > -1) {
      acc[categoryIndex].data.push(item);
    } else {
      acc.push({ title: department, emoji: item.emoji, data: [item] });
    }
    
    return acc;
  }, []);
  
  return (
    <SafeAreaView style={{ flex: 1,  backgroundColor }}>
      {/* Go Back Button */}
      <GoBackButton 
        text="Back Home" 
      />

      {/* Shopping List Container */}
      <ThemedView 
        style={[
          styles.container,
          Platform.OS === "web" && styles.webContainer
        ]}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Shopping List</ThemedText>
        </ThemedView>

        {/* Display Shopping List Grouped by Category */}
        <SectionList
          sections={groupedItems}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) => (
            <ThemedText type="subtitle" style={styles.sectionHeader}>{section.emoji} {section.title}</ThemedText>
          )}
          renderItem={({ item }) => (
            <ThemedView style={styles.item}>
              <ThemedView style={styles.itemDetailsContainer}>
                {/* Checkbox as an Icon */}
                <TouchableOpacity
                  onPress={() => togglePurchased(item.id)}
                  style={styles.checkboxContainer}
                >
                  <ThemedText type="defaultSemiBold">
                    <FontAwesome 
                      name={item.purchased ? "check-square" : "square"} 
                      size={24}
                      color={item.purchased ? "#4CAF50" : "#bbb"} // Green for checked, gray for unchecked
                    />
                  </ThemedText>
                </TouchableOpacity>

                {/* Product Name (Clickable) */}
                <TouchableOpacity
                  onPress={() => router.push({ pathname: "/product-details", params: { item: JSON.stringify(item) } })}
                  style={styles.itemTitleContainer}
                >
                  <ThemedText 
                    type="defaultSemiBold"
                    style={[
                      styles.itemTitle,
                      item.purchased && styles.purchasedTitle,
                      Platform.OS === "web" ? styles.webItemTitle : styles.mobileItemTitle
                    ]}
                    numberOfLines={1} // Limits to 1 line
                    ellipsizeMode="tail" // Adds "..." if the text is too long
                  >
                    {item.name}
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
              
              {/* Action Buttons (Edit & Delete) */}
              <ThemedView style={styles.actionButtonsContainer}>
                {/* Edit Button */}
                <TouchableOpacity 
                  onPress={() => router.push(`/add-edit-item?item=${encodeURIComponent(JSON.stringify(item))}`)} 
                  style={styles.itemTitleContainer}
                >
                  <ThemedText style={styles.actionButtonText}>✏️</ThemedText>
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <ThemedText style={styles.actionButtonText}>❌</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          )}
        />
      </ThemedView>
    </SafeAreaView>
  );
}
