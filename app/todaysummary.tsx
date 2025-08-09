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

// Sample data structure - replace with your API data
const sampleBillData = [
  { id: 1, billNo: 'B001', user: 'John Doe', amount: '$25.50', time: '10:30 AM' },
  { id: 2, billNo: 'B002', user: 'Jane Smith', amount: '$18.75', time: '11:15 AM' },
  { id: 3, billNo: 'B003', user: 'Mike Johnson', amount: '$32.20', time: '12:45 PM' },
  { id: 4, billNo: 'B004', user: 'Sarah Wilson', amount: '$15.90', time: '1:20 PM' },
  { id: 5, billNo: 'B005', user: 'David Brown', amount: '$28.65', time: '2:30 PM' },
  { id: 6, billNo: 'B006', user: 'Emily Davis', amount: '$42.30', time: '3:15 PM' },
  { id: 7, billNo: 'B007', user: 'Robert Miller', amount: '$19.85', time: '3:45 PM' },
  { id: 8, billNo: 'B008', user: 'Lisa Anderson', amount: '$37.60', time: '4:20 PM' },
  { id: 9, billNo: 'B009', user: 'Chris Taylor', amount: '$23.75', time: '4:55 PM' },
  { id: 10, billNo: 'B010', user: 'Amanda White', amount: '$31.40', time: '5:30 PM' },
  { id: 11, billNo: 'B011', user: 'Kevin Martinez', amount: '$29.95', time: '6:10 PM' },
  { id: 12, billNo: 'B012', user: 'Rachel Garcia', amount: '$16.80', time: '6:45 PM' },
];

export default function TodaySummaryScreen() {
  const router = useRouter();
  const [billData, setBillData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch data from API
  const fetchTodayData = async () => {
    try {
      setIsLoading(true);
      // Replace this with your actual API call
      // const response = await fetch('YOUR_API_ENDPOINT');
      // const data = await response.json();
      
      // For now, using sample data
      setTimeout(() => {
        setBillData(sampleBillData);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  // Refresh data
  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchTodayData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchTodayData();
  }, []);

  const handleBackPress = () => {
    router.back();
  };

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, styles.billNoColumn]}>Bill No</Text>
      <Text style={[styles.headerText, styles.userColumn]}>User</Text>
      <Text style={[styles.headerText, styles.amountColumn]}>Amount</Text>
      <Text style={[styles.headerText, styles.timeColumn]}>Time</Text>
    </View>
  );

  const renderBillItem = ({ item, index }) => (
    <View style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
      <Text style={[styles.cellText, styles.billNoColumn]}>{item.billNo}</Text>
      <Text style={[styles.cellText, styles.userColumn]} numberOfLines={1}>
        {item.user}
      </Text>
      <Text style={[styles.cellText, styles.amountColumn, styles.amountText]}>
        {item.amount}
      </Text>
      <Text style={[styles.cellText, styles.timeColumn]}>{item.time}</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Image 
        source={{ uri: 'https://img.icons8.com/ios-filled/100/cccccc/receipt.png' }} 
        style={styles.emptyIcon} 
      />
      <Text style={styles.emptyText}>No bills found for today</Text>
      <Text style={styles.emptySubText}>Bills will appear here when available</Text>
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
          <Text style={styles.headerTitle}>Today's Summary</Text>
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
                <Text style={styles.loadingText}>Loading today's data...</Text>
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
                {billData.length === 0 ? (
                  renderEmptyState()
                ) : (
                  billData.map((item, index) => (
                    <View key={item.id} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                      <Text style={[styles.cellText, styles.billNoColumn]}>{item.billNo}</Text>
                      <Text style={[styles.cellText, styles.userColumn]} numberOfLines={1}>
                        {item.user}
                      </Text>
                      <Text style={[styles.cellText, styles.amountColumn, styles.amountText]}>
                        {item.amount}
                      </Text>
                      <Text style={[styles.cellText, styles.timeColumn]}>{item.time}</Text>
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
  // Column widths
  billNoColumn: {
    flex: 1.2,
  },
  userColumn: {
    flex: 2,
  },
  amountColumn: {
    flex: 1.3,
  },
  timeColumn: {
    flex: 1.5,
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