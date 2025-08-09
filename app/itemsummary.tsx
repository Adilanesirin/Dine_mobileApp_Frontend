import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Sample data structure for item summary - replace with your API data
const sampleItemData = [
  { id: 1, item: 'Burger', quantity: 145, totalAmount: '$1,450.00' },
  { id: 2, item: 'Pizza', quantity: 89, totalAmount: '$1,780.00' },
  { id: 3, item: 'French Fries', quantity: 203, totalAmount: '$812.00' },
  { id: 4, item: 'Chicken Wings', quantity: 76, totalAmount: '$1,140.00' },
  { id: 5, item: 'Pasta', quantity: 92, totalAmount: '$1,288.00' },
  { id: 6, item: 'Sandwich', quantity: 134, totalAmount: '$1,072.00' },
  { id: 7, item: 'Salad', quantity: 67, totalAmount: '$670.00' },
  { id: 8, item: 'Steak', quantity: 45, totalAmount: '$1,350.00' },
  { id: 9, item: 'Soup', quantity: 112, totalAmount: '$560.00' },
  { id: 10, item: 'Ice Cream', quantity: 156, totalAmount: '$624.00' },
  { id: 11, item: 'Coffee', quantity: 298, totalAmount: '$894.00' },
  { id: 12, item: 'Juice', quantity: 187, totalAmount: '$561.00' },
  { id: 13, item: 'Cake', quantity: 34, totalAmount: '$510.00' },
  { id: 14, item: 'Cookies', quantity: 89, totalAmount: '$267.00' },
  { id: 15, item: 'Tacos', quantity: 78, totalAmount: '$702.00' },
];

export default function ItemSummaryScreen() {
  const router = useRouter();
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch item summary data from API
  const fetchItemData = async () => {
    try {
      setIsLoading(true);
      // Replace this with your actual API call
      // const response = await fetch('YOUR_ITEM_API_ENDPOINT');
      // const data = await response.json();
      
      // For now, using sample data
      setTimeout(() => {
        setItemData(sampleItemData);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error fetching item data:', error);
      setIsLoading(false);
    }
  };

  // Refresh data
  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchItemData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  const handleBackPress = () => {
    router.back();
  };

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, styles.itemColumn]}>Item</Text>
      <Text style={[styles.headerText, styles.quantityColumn]}>No.s</Text>
      <Text style={[styles.headerText, styles.amountColumn]}>Total Amount</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Image 
        source={{ uri: 'https://img.icons8.com/ios-filled/100/cccccc/restaurant.png' }} 
        style={styles.emptyIcon} 
      />
      <Text style={styles.emptyText}>No items found</Text>
      <Text style={styles.emptySubText}>Item summaries will appear here when available</Text>
    </View>
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
          <Text style={styles.headerTitle}>Item Summary</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/61/61444.png' }} 
              style={styles.refreshIcon} 
            />
          </TouchableOpacity>
        </View>

        {/* Table Container with ScrollView */}
        <View style={styles.tableContainer}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
            style={styles.tableBackground}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e1116b" />
                <Text style={styles.loadingText}>Loading item data...</Text>
              </View>
            ) : (
              <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={true}
                refreshControl={
                  <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                    colors={['#e1116b']}
                    tintColor="#e1116b"
                  />
                }
              >
                {renderTableHeader()}
                {itemData.length === 0 ? (
                  renderEmptyState()
                ) : (
                  itemData.map((item, index) => (
                    <View 
                      key={item.id}
                      style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
                    >
                      <Text style={[styles.cellText, styles.itemColumn]} numberOfLines={2}>
                        {item.item}
                      </Text>
                      <Text style={[styles.cellText, styles.quantityColumn, styles.quantityText]}>
                        {item.quantity}
                      </Text>
                      <Text style={[styles.cellText, styles.amountColumn, styles.amountText]}>
                        {item.totalAmount}
                      </Text>
                    </View>
                  ))
                )}
              </ScrollView>
            )}
          </LinearGradient>
        </View>
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
    paddingTop: 20,
    paddingBottom: 60,
  },
  backIcon: {
    width: 22,
    height: 30,
    tintColor: '#fff',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  refreshIcon: {
    width: 22,
    height: 22,
    tintColor: '#fff',
  },
  tableContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  tableBackground: {
    flex: 1,
    borderRadius: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e1116b',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  evenRow: {
    backgroundColor: '#fff',
  },
  oddRow: {
    backgroundColor: '#f8f9fa',
  },
  cellText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  amountText: {
    fontWeight: '600',
    color: '#e1116b',
  },
  quantityText: {
    fontWeight: '600',
    color: '#333',
  },
  // Column widths
  itemColumn: {
    flex: 2.5,
    textAlign: 'left',
    paddingLeft: 5,
  },
  quantityColumn: {
    flex: 1.2,
  },
  amountColumn: {
    flex: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyIcon: {
    width: 60,
    height: 60,
    marginBottom: 15,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
  },
});