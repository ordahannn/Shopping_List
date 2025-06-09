  import React, { useState, useEffect } from 'react';
  import { useRouter, useLocalSearchParams } from 'expo-router';
  import { TextInput, TouchableOpacity, FlatList, Alert, SafeAreaView, Modal, Platform } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { ThemedText } from '@/components/ThemedText';
  import { ThemedView } from '@/components/ThemedView';
  import { useThemeColor } from '@/hooks/useThemeColor';
  import FontAwesome from '@expo/vector-icons/FontAwesome';
  import styles from '@/styles/add-edit-item-styles';

  const AddEditItemScreen = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [name, setName] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [userItems, setUserItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [customItem, setCustomItem] = useState({ name: '', description: '' });

    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const inputBackgroundColor = useThemeColor({}, 'inputBackground');
    const buttonColor = useThemeColor({}, 'buttonColor');
    const jsonDepartments = require('../../assets/GroceryStoreItems.json').departments;
    
    useEffect(() => {
      // check if an item was transfered to edit
      if (params?.item) {
        try {
          const item = JSON.parse(params.item);
          console.log('Editing item:', item);
          setName(item.name);
          setSelectedItem(item);
        } catch (error) {
          console.error('Error parsing item:', error);
        }
      } else {
        setName('');
        setSelectedItem(null);
      }
      setDepartments(jsonDepartments);
      loadUserItems();
    }, [params?.item]); 

    // load the user's shopping list items
    const loadUserItems = async () => {
      console.log('Loading user items from AsyncStorage');
      try {
        const storedItems = await AsyncStorage.getItem('shoppingList');

        if (storedItems) {
          const parsedItems = JSON.parse(storedItems);
          setUserItems(Array.isArray(parsedItems) ? parsedItems : []);
        } else {
          setUserItems([]);
        }
      } catch (error) {
        console.error('Error retrieving shoppingList:', error);
        setUserItems([]);
      }
    };

    // update the user list items when editing or adding an item
    const saveUserItems = async (items) => {
      try {
        console.log('Saving shoppingList to AsyncStorage:', items);
        await AsyncStorage.setItem('shoppingList', JSON.stringify(items));

        setUserItems(items);
      } catch (error) {
        console.error('Error saving shoppingList:', error);
      }
    };

    // set the fields to include the chosen item data
    const selectItem = (item) => {
      setName(item.name);
      setSelectedItem(item);
      setSuggestions([]);
    };

    // save an item 
    const saveItem = async () => {
      await loadUserItems();

      // display the right alert based on the user's platform
      if (!selectedItem) {
        if (Platform.OS === 'web') {
          window.alert("You Have To Choose an Item");
        } else {
            Alert.alert("You Have To Choose an Item", "", [{ text: "OK", style: "cancel" }]);
        }
          return;
      }

      let updatedUserItems = [...userItems];

      // check if the item already exists in the list
      const duplicateItem = updatedUserItems.find(item => 
          item.id !== (params?.item ? JSON.parse(params.item).id : null) &&
          item.name.toLowerCase() === selectedItem.name.toLowerCase()
      );

      if (duplicateItem) {
        // display the right alert based on the user's platform
        if (Platform.OS === 'web') {
          window.alert("This item is already in your shopping list.");
        } else {
            Alert.alert(
                "Item Already in List",
                "This item is already in your shopping list.",
                [{ text: "OK", style: "cancel" }]
            );
        }
        return;
      }

      if (params?.item) {
          const originalItem = JSON.parse(params.item);
          const itemIndex = updatedUserItems.findIndex(item => item.id === originalItem.id);
          if (itemIndex > -1) {
              updatedUserItems[itemIndex] = { ...selectedItem, purchased: updatedUserItems[itemIndex].purchased };
          }
      } else {
          updatedUserItems.push({ ...selectedItem, purchased: false });
      }

      await saveUserItems(updatedUserItems);

      // display the right alert based on the user's platform
      if (Platform.OS === 'web') {
        window.alert("The item has been successfully updated.");
        router.push('/shopping-list');
      } else {
          Alert.alert("Item Saved", "The item has been successfully updated.", [
              { text: "Go to Shopping List", onPress: () => router.push('/shopping-list') },
          ]);
      }

      setName('');
      setSelectedItem(null);
    };

    // handle the search suggestions
    const handleSearch = (text) => {
      setName(text);
      setSelectedItem(null);
      setSuggestions(
        text.length > 0
          ? departments.flatMap(dept => dept.items)
            .filter(item => item.name.toLowerCase().startsWith(text.toLowerCase()))
            .slice(0, 5)
          : []
      );
    };

    // handle add a custom item that is not in the all items list
    const handleAddCustomItem = async () => {
      if (!customItem.name.trim()) {
        console.log("Item is required");

        // display the right alert based on the user's platform
        if (Platform.OS === 'web') {
          window.alert("Item name is required");
          router.push('/shopping-list');
        } else {
          Alert.alert('Error', 'Item name is required');
        }
        
        return;
      }

      const allItems = departments.flatMap(dept => dept.items);
      if (allItems.find(item => item.name.toLowerCase() === customItem.name.toLowerCase())) {
        console.log("This item already exists!");
        
        // display the right alert based on the user's platform
        if (Platform.OS === 'web') {
          window.alert("Item name is required");
          router.push('/shopping-list');
        } else {
          Alert.alert('Error', 'This item already exists');
        }
        
        return;
      }

      let customDepartment = departments.find(dept => dept.name === "Custom Supplies");
      if (!customDepartment) {
        customDepartment = { name: "Custom Supplies","description": "A selection of user-added supplies for unique or unavailable items, ensuring a fully personalized shopping experience.", emoji: "💡", items: [] };
        departments.push(customDepartment);
      }

      const newItem = {
        id: allItems.length + 1,
        name: customItem.name,
        description: customItem.description,
        emoji: '💡',
        purchased: false
      };

      customDepartment.items.push(newItem);
      await AsyncStorage.setItem('departmentsList', JSON.stringify(departments));
      setDepartments([...departments]);

      setSelectedItem(newItem);
      setName(newItem.name);
      setSuggestions([]);
      setModalVisible(false);
      setCustomItem({ name: '', description: '' });
    };

    return (
      <SafeAreaView style={[styles.safeContainer, { backgroundColor }]}>
          <ThemedView style={[styles.container, { backgroundColor }]}>
            <ThemedView style={[styles.itemView, { backgroundColor }]}>
              <ThemedText type="title" style={{ color: textColor }}>
                {selectedItem ? 'Edit Item' : 'Add Item'}
              </ThemedText>
              <ThemedView style={styles.inputColumn}>
                <TextInput 
                  style={[styles.inputHalf, { color: textColor, backgroundColor: inputBackgroundColor}]} 
                  value={name} 
                  onChangeText={handleSearch} 
                  placeholder="Item Name" 
                />
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addCustomItemBtn}>
                  <FontAwesome name="plus" size={24} style={{ color : buttonColor}} />
                </TouchableOpacity>
              </ThemedView>
              <ThemedView style={styles.suggestionsContainer}>
                {selectedItem ? (
                  <ThemedView style={[styles.itemDetails, { color: textColor, backgroundColor: inputBackgroundColor}]}>
                    <ThemedText style={styles.emoji}>{selectedItem.emoji}</ThemedText>
                    <ThemedText style={styles.description}>{selectedItem.description}</ThemedText>
                  </ThemedView>
                ) : (
                  suggestions.length > 0 && (
                    <ThemedView style={styles.dropdown}>
                      <FlatList
                        data={suggestions}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                          <TouchableOpacity onPress={() => selectItem(item)}>
                          <ThemedText style={[styles.suggestionText, { color : textColor}]}>
                            <ThemedText style={[styles.boldText, { color : textColor}]}>
                              {item.name.substring(0, name.length)}
                            </ThemedText>
                            {item.name.substring(name.length)}
                          </ThemedText>
                          </TouchableOpacity>
                        )}
                      />
                    </ThemedView>
                  )
                )}
              </ThemedView>
            </ThemedView>
            <ThemedView style={styles.buttons}>
              <TouchableOpacity style={[styles.saveButton, { backgroundColor: buttonColor}]} onPress={saveItem}>
                <ThemedText style={styles.saveButtonText}>
                  {selectedItem && userItems.some(item => item.id === selectedItem.id) ? 'Edit Item' : 'Add Item'}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
            {modalVisible && (
              <Modal visible={modalVisible} transparent={true} animationType="slide">
                <ThemedView style={styles.modalContainer}>
                  <ThemedText type="title" style={{ color: textColor }}>Add a Custom Item</ThemedText>
                  <ThemedView style={styles.modalInputs}>
                      <TextInput style={[styles.modalInput, { color: textColor, backgroundColor: inputBackgroundColor }]} placeholder="Item Name" value={customItem.name} onChangeText={(text) => setCustomItem({ ...customItem, name: text })} />
                      <TextInput style={[styles.modalInput, { color: textColor, backgroundColor: inputBackgroundColor }]} placeholder="Description" value={customItem.description} onChangeText={(text) => setCustomItem({ ...customItem, description: text })} 
                    />
                  </ThemedView>
                  <ThemedView style={styles.buttons}>
                    <TouchableOpacity style={[styles.modalButton, { backgroundColor: buttonColor}]} onPress={handleAddCustomItem}>
                      <ThemedText style={[styles.modalButtonText, { color: textColor }]}>Add Item</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.addModalButton, { backgroundColor: inputBackgroundColor}]} onPress={() => setModalVisible(false)}>
                      <ThemedText style={[styles.modalButtonText, { color: textColor}]}>Cancel</ThemedText>
                    </TouchableOpacity>
                  </ThemedView>
                </ThemedView>
              </Modal>
            )}
          </ThemedView>
      </SafeAreaView>
    );
  };

  export default AddEditItemScreen;
