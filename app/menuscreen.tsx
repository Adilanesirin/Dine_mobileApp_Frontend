import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Image,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const API_URL = 'https://dinewebappapi.sysmac.in/api/items/';

export default function MenuScreen() {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Fetch menu items from API
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const result = await response.json();
      
      if (result.status === 'success' && result.data) {
        setMenuItems(result.data);
        setFilteredItems(result.data);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(result.data.map(item => item.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } else {
        Alert.alert('Error', 'Failed to fetch menu items');
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      Alert.alert('Error', 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Filter items based on search query and category
  const filterItems = () => {
    let filtered = menuItems;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.item_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.kitchen && item.kitchen.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredItems(filtered);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchQuery, selectedCategory, menuItems]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMenuItems();
  };

  const handleBackPress = () => {
    router.back();
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    return numPrice > 0 ? `₹${numPrice.toFixed(2)}` : '-';
  };

  // Helper function to get all available rates
  const getAllRates = (item) => {
    const rateKeys = ['rate', 'rate1', 'rate2', 'rate3', 'rate4', 'rate5', 'rate6', 'rate7'];
    const rateLabels = ['Base Rate', 'Rate 1', 'Rate 2', 'Rate 3', 'Rate 4', 'Rate 5', 'Rate 6', 'Rate 7'];
    
    return rateKeys.map((key, index) => ({
      key,
      label: rateLabels[index],
      value: item[key],
      price: parseFloat(item[key] || 0)
    })).filter(rate => rate.price > 0);
  };

  // Helper function to check if item has additional rates beyond the main ones
  const hasAdditionalRates = (item) => {
    const additionalRates = ['rate3', 'rate4', 'rate5', 'rate6', 'rate7'];
    return additionalRates.some(rate => parseFloat(item[rate] || 0) > 0);
  };

  const toggleCardExpanded = (itemId) => {
    const newExpandedCards = new Set(expandedCards);
    if (newExpandedCards.has(itemId)) {
      newExpandedCards.delete(itemId);
    } else {
      newExpandedCards.add(itemId);
    }
    setExpandedCards(newExpandedCards);
  };

  const renderCategoryButton = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.activeCategoryButton
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === item && styles.activeCategoryButtonText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item, index }) => {
    const isExpanded = expandedCards.has(item.id);
    const allRates = getAllRates(item);
    const hasAdditional = hasAdditionalRates(item);
    
    // Separate quick rates (base, rate1, rate2) from additional rates
    const quickRates = allRates.slice(0, 3); // First 3 rates for quick view
    const additionalRates = allRates.slice(3); // Remaining rates for expanded view
    
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          {/* Main Card Content */}
          <View style={styles.cardHeader}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>
                {item.item_name}
              </Text>
              <View style={styles.itemMeta}>
                <View style={styles.itemCodeContainer}>
                  <Text style={styles.itemCode}>#{item.item_code}</Text>
                </View>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>
                    {item.category || 'General'}
                  </Text>
                </View>
              </View>
              {item.kitchen && (
                <View style={styles.kitchenContainer}>
                  <Text style={styles.kitchenLabel}>Kitchen: </Text>
                  <Text style={styles.kitchenText}>{item.kitchen}</Text>
                </View>
              )}
            </View>
            
            <View style={styles.priceSection}>
              <Text style={styles.mainPrice}>
                {formatPrice(item.rate)}
              </Text>
              <Text style={styles.priceLabel}>Base Rate</Text>
            </View>
          </View>

          {/* Quick Rates - Show first 2 additional rates if available */}
          {quickRates.length > 1 && (
            <View style={styles.quickRates}>
              {quickRates.slice(1).map((rate) => (
                <View key={rate.key} style={styles.quickRateItem}>
                  <Text style={styles.quickRatePrice}>{formatPrice(rate.value)}</Text>
                  <Text style={styles.quickRateLabel}>{rate.label}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Rate Summary */}
          <View style={styles.rateSummary}>
            <Text style={styles.rateSummaryText}>
              {allRates.length} rate{allRates.length !== 1 ? 's' : ''} available
            </Text>
            {hasAdditional && (
              <Text style={styles.rateSummarySubtext}>
                {additionalRates.length} more rate{additionalRates.length !== 1 ? 's' : ''}
              </Text>
            )}
          </View>

          {/* Expandable Section */}
          {hasAdditional && (
            <TouchableOpacity 
              style={styles.expandButton}
              onPress={() => toggleCardExpanded(item.id)}
            >
              <Text style={styles.expandButtonText}>
                {isExpanded ? 'Show Less Rates' : 'Show All Rates'}
              </Text>
              <Text style={styles.expandIcon}>
                {isExpanded ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>
          )}

          {/* Expanded Content - Show all rates in organized manner */}
          {isExpanded && (
            <View style={styles.expandedContent}>
              <Text style={styles.expandedTitle}>All Available Rates</Text>
              <View style={styles.allRatesContainer}>
                {allRates.map((rate, index) => (
                  <View key={rate.key} style={[
                    styles.rateItem,
                    index === 0 && styles.baseRateItem
                  ]}>
                    <View style={styles.rateInfo}>
                      <Text style={[
                        styles.rateLabel,
                        index === 0 && styles.baseRateLabel
                      ]}>
                        {rate.label}
                      </Text>
                      {index === 0 && (
                        <Text style={styles.primaryTag}>PRIMARY</Text>
                      )}
                    </View>
                    <Text style={[
                      styles.ratePrice,
                      index === 0 && styles.baseRatePrice
                    ]}>
                      {formatPrice(rate.value)}
                    </Text>
                  </View>
                ))}
              </View>
              
              {/* Additional Info in Expanded View */}
              <View style={styles.additionalInfo}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Category:</Text>
                  <Text style={styles.infoValue}>{item.category || 'General'}</Text>
                </View>
                {item.kitchen && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Kitchen:</Text>
                    <Text style={styles.infoValue}>{item.kitchen}</Text>
                  </View>
                )}
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Item Code:</Text>
                  <Text style={styles.infoValue}>#{item.item_code}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyIcon}>🍽️</Text>
      </View>
      <Text style={styles.emptyStateTitle}>
        {searchQuery ? 'No items found' : 'No menu items available'}
      </Text>
      <Text style={styles.emptyStateSubtitle}>
        {searchQuery ? 'Try adjusting your search terms' : 'Pull down to refresh'}
      </Text>
      {!searchQuery && (
        <TouchableOpacity style={styles.retryButton} onPress={fetchMenuItems}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading && !refreshing) {
    return (
      <LinearGradient
        colors={['#8c103cff', '#a01449', '#8c103cff']}
        style={styles.loadingContainer}
      >
        <StatusBar barStyle="light-content" backgroundColor="#8c103cff" />
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Loading delicious menu...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8c103cff" />
      <LinearGradient
        colors={['#8c103cff', '#a01449', '#8c103cff']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/back.png' }}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Menu Items</Text>
            <Text style={styles.headerSubtitle}>
              {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} available
            </Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/50/8c103cff/search.png' }}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, code, category, or kitchen..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Image
                  source={{ uri: 'https://img.icons8.com/ios-filled/50/999999/multiply.png' }}
                  style={styles.clearIcon}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* Category Filter */}
        <FlatList
          data={categories}
          renderItem={renderCategoryButton}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
          style={styles.categoryList}
        />
      </LinearGradient>

      {/* Menu Items List */}
      <FlatList
        data={filteredItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#8c103cff']}
            tintColor="#8c103cff"
          />
        }
        ListEmptyComponent={renderEmptyState}
        style={styles.menuList}
        contentContainerStyle={styles.menuListContent}
      />
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8c103cff',
  },
  gradient: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 15,
    fontWeight: '500',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#ffffff',
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  headerSpacer: {
    width: 40,
  },
  
  // Search Styles
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  clearIcon: {
    width: 16,
    height: 16,
  },
  
  // Category Styles
  categoryList: {
    maxHeight: 50,
  },
  categoryContainer: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeCategoryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  categoryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  activeCategoryButtonText: {
    color: '#8c103cff',
  },
  
  // Menu List Styles
  menuList: {
    flex: 1,
    backgroundColor: '#8c103cff',
  },
  menuListContent: {
    paddingTop: 10,
  },
  
  // Card Styles
  cardContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  itemInfo: {
    flex: 1,
    marginRight: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemCodeContainer: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  itemCode: {
    fontSize: 12,
    color: '#8c103cff',
    fontWeight: '600',
  },
  categoryBadge: {
    backgroundColor: 'rgba(140, 16, 60, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    color: '#8c103cff',
    fontWeight: '600',
  },
  kitchenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  kitchenLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  kitchenText: {
    fontSize: 13,
    color: '#8c103cff',
    fontWeight: '600',
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  mainPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#8c103cff',
    marginBottom: 2,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  
  // Quick Rates
  quickRates: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  quickRateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 5,
  },
  quickRatePrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8c103cff',
    marginRight: 6,
  },
  quickRateLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  
  // Rate Summary
  rateSummary: {
    marginBottom: 10,
  },
  rateSummaryText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  rateSummarySubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  
  // Expand Button
  expandButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 5,
  },
  expandButtonText: {
    fontSize: 14,
    color: '#8c103cff',
    fontWeight: '600',
    marginRight: 5,
  },
  expandIcon: {
    fontSize: 12,
    color: '#8c103cff',
  },
  
  // Expanded Content
  expandedContent: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  expandedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  allRatesContainer: {
    marginBottom: 20,
  },
  rateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    marginBottom: 8,
  },
  baseRateItem: {
    backgroundColor: 'rgba(140, 16, 60, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(140, 16, 60, 0.2)',
  },
  rateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  baseRateLabel: {
    color: '#8c103cff',
    fontWeight: '600',
  },
  primaryTag: {
    fontSize: 10,
    color: '#8c103cff',
    fontWeight: '700',
    backgroundColor: 'rgba(140, 16, 60, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  ratePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  baseRatePrice: {
    color: '#8c103cff',
    fontSize: 18,
  },
  
  // Additional Info
  additionalInfo: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  
  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    marginBottom: 20,
  },
  emptyIcon: {
    fontSize: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#8c103cff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#8c103cff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});