import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const filterOptions = [
  { id: 1, label: 'Today Summary', value: 'today' },
  { id: 2, label: 'Month Summary', value: 'month' },
  { id: 3, label: 'Item Summary', value: 'item' },
  { id: 4, label: 'Day Summary', value: 'day' },
];

export default function SummaryScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const handleBackPress = () => {
    router.back();
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setIsDropdownVisible(false);
  };

  const handleCreatePress = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateSummary = () => {
    // Add your create summary logic here
    console.log(`Creating ${selectedFilter.label}`);
    setIsCreateModalVisible(false);
    
    // Navigate to specific summary pages based on selection
    if (selectedFilter.value === 'today') {
      router.push('/todaysummary');
    } else if (selectedFilter.value === 'month') {
      router.push('/monthsummary');
    } else if (selectedFilter.value === 'item') {
      router.push('/itemsummary');
    } else if (selectedFilter.value === 'day') {
      router.push('/daysummary');
    }
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handleFilterSelect(item)}
    >
      <Text style={styles.dropdownItemText}>{item.label}</Text>
      {selectedFilter.id === item.id && (
        <Image 
          source={{ uri: 'https://img.icons8.com/ios-filled/50/26e07f/checkmark.png' }} 
          style={styles.checkIcon} 
        />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#e1116bff" />
      <LinearGradient
        colors={['#8c103cff', '#8c103cff', '#8c103cff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image 
              source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/back.png' }} 
              style={styles.backIcon} 
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Summary</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Search Bar Dropdown */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchLabel}>Select Summary Type:</Text>
            <TouchableOpacity
              style={styles.searchDropdown}
              onPress={() => setIsDropdownVisible(!isDropdownVisible)}
            >
              <Image 
                source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/search.png' }} 
                style={styles.searchIcon} 
              />
              <Text style={styles.searchDropdownText}>{selectedFilter.label}</Text>
              <Image 
                source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/expand-arrow.png' }} 
                style={[styles.dropdownArrow, isDropdownVisible && styles.dropdownArrowRotated]} 
              />
            </TouchableOpacity>
          </View>

          {/* Create Button */}
          <View style={styles.createContainer}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreatePress}
            >
              <Image 
                source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/plus.png' }} 
                style={styles.createButtonIcon} 
              />
              <Text style={styles.createButtonText}>
                Create {selectedFilter.label}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dropdown Modal */}
        <Modal
          visible={isDropdownVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsDropdownVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setIsDropdownVisible(false)}
          >
            <View style={styles.dropdownModal}>
              <Text style={styles.dropdownTitle}>Select Summary Type</Text>
              <FlatList
                data={filterOptions}
                renderItem={renderDropdownItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.dropdownList}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Create Summary Modal */}
        <Modal
          visible={isCreateModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsCreateModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.createModal}>
              <Image 
                source={{ uri: 'https://img.icons8.com/ios-filled/100/26e07f/plus.png' }} 
                style={styles.modalIcon} 
              />
              <Text style={styles.modalTitle}>Create New Summary</Text>
              <Text style={styles.modalSubtitle}>
                You are about to create a new {selectedFilter.label.toLowerCase()}
              </Text>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setIsCreateModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={handleCreateSummary}
                >
                  <Text style={styles.confirmButtonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
 
  backIcon: {
    width: 32,
    height: 32,
    tintColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 48, // Same width as back button to keep header centered
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
  },
  searchContainer: {
    width: '100%',
    marginBottom: 40,
  },
  searchLabel: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  searchDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'rgba(246, 3, 84, 0.3)',
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: '#666',
  },
  searchDropdownText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  dropdownArrow: {
    width: 24,
    height: 24,
    tintColor: '#666',
    transform: [{ rotate: '90deg' }],
  },
  dropdownArrowRotated: {
    transform: [{ rotate: '270deg' }],
  },
  createContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1116b',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 18,
    shadowColor: '#e1116b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    minWidth: screenWidth * 0.7,
    justifyContent: 'center',
  },
  createButtonIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    marginRight: 12,
  },
  createButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 20,
    maxHeight: 400,
    minWidth: screenWidth * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  dropdownTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownList: {
    borderRadius: 20,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  checkIcon: {
    width: 20,
    height: 20,
    tintColor: '#26e07f',
  },
  createModal: {
    backgroundColor: '#fff',
    borderRadius: 25,
    margin: 20,
    padding: 30,
    minWidth: screenWidth * 0.85,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 15,
  },
  modalIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    tintColor: '#e1116b',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 15,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#e1116b',
    shadowColor: '#e1116b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  confirmButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
});