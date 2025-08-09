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

// Sample data structure for daily summary - replace with your API data
const sampleDayData = [
  { id: 1, day: 'Monday', totalBills: 89, totalAmount: '$2,340.75' },
  { id: 2, day: 'Tuesday', totalBills: 76, totalAmount: '$1,980.50' },
  { id: 3, day: 'Wednesday', totalBills: 93, totalAmount: '$2,520.90' },
  { id: 4, day: 'Thursday', totalBills: 102, totalAmount: '$2,785.60' },
  { id: 5, day: 'Friday', totalBills: 134, totalAmount: '$3,680.30' },
  { id: 6, day: 'Saturday', totalBills: 156, totalAmount: '$4,290.45' },
  { id: 7, day: 'Sunday', totalBills: 128, totalAmount: '$3,520.80' },
];

export default function DaySummaryScreen() {
  const router = useRouter();
  const [dayData, setDayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch daily summary data from API
  const fetchDayData = async () => {
    try {
      setIsLoading(true);
      // Replace this with your actual API call
      // const response = await fetch('YOUR_DAILY_API_ENDPOINT');
      // const data = await response.json();
      
      // For now, using sample data
      setTimeout(() => {
        setDayData(sampleDayData);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error fetching daily data:', error);
      setIsLoading(false);
    }
  };

  // Refresh data
  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchDayData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchDayData();
  }, []);

  const handleBackPress = () => {
    router.back();
  };

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, styles.dayColumn]}>Day</Text>
      <Text style={[styles.headerText, styles.billsColumn]}>Total Bills</Text>
      <Text style={[styles.headerText, styles.amountColumn]}>Total Amount</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Image 
        source={{ uri: 'https://img.icons8.com/ios-filled/100/cccccc/calendar-7.png' }} 
        style={styles.emptyIcon} 
      />
      <Text style={styles.emptyText}>No daily data found</Text>
      <Text style={styles.emptySubText}>Daily summaries will appear here when available</Text>
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
          <Text style={styles.headerTitle}>Day Summary</Text>
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
                <Text style={styles.loadingText}>Loading daily data...</Text>
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
                {dayData.length === 0 ? (
                  renderEmptyState()
                ) : (
                  dayData.map((item, index) => (
                    <View 
                      key={item.id}
                      style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
                    >
                      <Text style={[styles.cellText, styles.dayColumn]} numberOfLines={1}>
                        {item.day}
                      </Text>
                      <Text style={[styles.cellText, styles.billsColumn, styles.billsText]}>
                        {item.totalBills}
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
    paddingBottom: 100,
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
    marginBottom: 250,
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
  billsText: {
    fontWeight: '600',
    color: '#333',
  },
  // Column widths
  dayColumn: {
    flex: 2.5,
    textAlign: 'left',
  },
  billsColumn: {
    flex: 1.5,
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