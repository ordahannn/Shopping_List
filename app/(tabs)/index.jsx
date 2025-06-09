import React, { useState, useCallback } from 'react';
import { SafeAreaView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import styles from '@/styles/index-styles';

const HomeScreen = () => {
  const [itemCount, setItemCount] = useState(0);
  const router = useRouter();
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  // Function to load the shopping list count
  const loadItemCount = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('shoppingList');
      const parsedItems = storedItems ? JSON.parse(storedItems) : [];
      setItemCount(Array.isArray(parsedItems) ? parsedItems.length : 0);
    } catch (error) {
      console.error('Error retrieving shopping list:', error);
      setItemCount(0);
    }
  };

  // Ensure count updates whenever screen is focused
  useFocusEffect(
    useCallback(() => {
      loadItemCount();
    }, [])
  );

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor }]}>
        <ThemedView style={[styles.container, { backgroundColor }]}>
          <ThemedView style={[styles.texts, { backgroundColor }]}>
            <ThemedText type="title" style={[styles.hello, { color: textColor }]}>
              Welcome to your shopping list!
            </ThemedText>
            <ThemedText type="subtitle" style={styles.itemCount}>
              You have {itemCount} {itemCount === 1 ? 'item' : 'items'} in your list.
            </ThemedText>
          </ThemedView>
          
          <TouchableOpacity style={styles.cartIconContainer} onPress={() => router.push('/(tabs)/shopping-list')}>
            <Image source={require('../../assets/images/shopping-cart-icon.png')} style={styles.cartIcon} />
          </TouchableOpacity>
        </ThemedView>
    </SafeAreaView>
  );
};

export default HomeScreen;
