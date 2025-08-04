import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Option 1: Custom Icon Component using SVG-like styling
const CustomIcon = ({ type, size = 50, color = '#e91e63' }) => {
  const iconStyle = {
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: size / 4,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const getIconContent = () => {
    switch (type) {
      case 'dine':
        return (
          <View style={iconStyle}>
            <View style={{
              width: size * 0.6,
              height: size * 0.6,
              borderRadius: size * 0.1,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{ color: color, fontSize: size * 0.3, fontWeight: 'bold' }}>🍽️</Text>
            </View>
          </View>
        );
      case 'starstay':
        return (
          <View style={iconStyle}>
            <View style={{
              width: size * 0.6,
              height: size * 0.6,
              borderRadius: size * 0.3,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{ color: color, fontSize: size * 0.3, fontWeight: 'bold' }}>⭐</Text>
            </View>
          </View>
        );
      case 'accounts':
        return (
          <View style={iconStyle}>
            <View style={{
              width: size * 0.6,
              height: size * 0.6,
              borderRadius: size * 0.1,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{ color: color, fontSize: size * 0.3, fontWeight: 'bold' }}>💰</Text>
            </View>
          </View>
        );
      case 'settings':
        return (
          <View style={iconStyle}>
            <View style={{
              width: size * 0.6,
              height: size * 0.6,
              borderRadius: size * 0.3,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{ color: color, fontSize: size * 0.3, fontWeight: 'bold' }}>⚙️</Text>
            </View>
          </View>
        );
      default:
        return (
          <View style={iconStyle}>
            <View style={{
              width: size * 0.6,
              height: size * 0.6,
              borderRadius: size * 0.1,
              backgroundColor: 'white',
            }} />
          </View>
        );
    }
  };

  return getIconContent();
};

// Updated grid items with individual icon sizes
const gridItems = [
  {
    title: 'Dine',
    // Local asset for Dine (adjusted path from app folder)
    icon: require('../assets/images/dine-logo.png'),
    iconSize: { width: 70, height: 70 }, // Custom size for Dine icon
    route: '/dashboard',
    backgroundColor: '#FF6B6B', // Custom background color for each card
  },
  {
    title: 'Star Stay',
    // External URL for Star Stay
    icon: { uri: 'https://img.freepik.com/premium-psd/stars-3d-icon_465216-444.jpg' },
    iconSize: { width: 70, height: 70 }, // Smaller size for Star Stay icon
    route: '/starstay',
    backgroundColor: '#4ECDC4',
  },
  {
    title: 'Accounts',
    // External URL for Accounts
    icon: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt6QvciH_45HMQngs3nbzSq6RmrPDija3xQg5aLwP-wAfimzzSs-jM3morDF_oO2pdoUo&usqp=CAU' },
    iconSize: { width: 60, height: 60 }, // Medium size for Accounts icon
    route: '/accounts',
    backgroundColor: '#45B7D1',
  },
  {
    title: 'Settings',
    // External URL for Settings
    icon: { uri: 'https://www.computerhope.com/jargon/s/settings-generic-gear.png' },
    iconSize: { width: 60, height: 60 }, // Default size for Settings icon
    route: '/settings',
    backgroundColor: '#96CEB4',
  },
];

export default function MainHomeScreen() {
  const router = useRouter();
  const [showProfileCard, setShowProfileCard] = useState(false);

  const handlePress = (item) => {
    console.log(`${item.title} pressed`);
    
    if (item.title === 'Dine') {
      router.push('/dashboard');
    } else {
      console.log(`Navigate to ${item.route}`);
    }
  };

  const handleProfilePress = () => {
    setShowProfileCard(true);
  };

  const handleLogout = () => {
    setShowProfileCard(false);
    router.replace('/LoginScreen');
  };

  const closeProfileCard = () => {
    setShowProfileCard(false);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#f1066cff" />
      <LinearGradient
        colors={['#8c103cff', '#8c103cff', '#8c103cff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* Header with Profile */}
        <View style={styles.topHeader}>
          <View style={styles.headerLeft}>
            <Text style={styles.appName}></Text>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
            <Image 
              source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/user-male-circle.png' }} 
              style={styles.profileIcon} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.header}>Welcome</Text>
          <Text style={styles.subHeader}>Choose a service to continue</Text>
        </View>

        {/* Glass Effect Container for Grid */}
        <View style={styles.glassContainer}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.07)', 'rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.glassBackground}
          >
            <View style={styles.grid}>
              {gridItems.map((item, index) => (
                <View key={index} style={styles.card}>
                  <TouchableOpacity 
                    style={styles.cardContent} 
                    onPress={() => handlePress(item)}
                    activeOpacity={0.8}
                  >
                    {/* Render icons with individual sizes */}
                    <Image 
                      source={item.icon} 
                      style={[
                        styles.icon,
                        item.iconSize && {
                          width: item.iconSize.width,
                          height: item.iconSize.height,
                        }
                      ]} 
                    />
                    <Text style={styles.cardText}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Select a module to get started</Text>
        </View>

        {/* Profile Card Modal */}
        <Modal
          visible={showProfileCard}
          transparent={true}
          animationType="fade"
          onRequestClose={closeProfileCard}
        >
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={closeProfileCard}
          >
            <View style={styles.profileCardContainer}>
              <LinearGradient
                colors={['#fffffffc', '#fdfdfdd0', '#fffffffc']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.profileCard}
              >
                <View style={styles.profileCardHeader}>
                  <Image 
                    source={{ uri: 'https://img.icons8.com/ios-filled/80/ffffff/user-male-circle.png' }} 
                    style={styles.profileCardIcon} 
                  />
                  <Text style={styles.profileCardTitle}>Hello User!</Text>
                </View>
                
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                  <Image 
                    source={{ uri: 'https://img.icons8.com/ios-filled/24/ffffff/exit.png' }} 
                    style={styles.logoutIcon} 
                  />
                  <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </Modal>
      </LinearGradient>
    </>
  );
}

const screenWidth = Dimensions.get('window').width;
const cardSize = (screenWidth - 140) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8c6f25ff',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  profileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 25,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  profileIcon: {
    width: 32,
    height: 32,
    tintColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#faf9faff',
    marginBottom: 8,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subHeader: {
    fontSize: 16,
    color: '#faf8f9ff',
    fontWeight: '400',
    textAlign: 'center',
    opacity: 0.8,
  },
  glassContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 150,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: 'rgba(255, 255, 255, 0.3)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  glassBackground: {
    flex: 1,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 39,
  },
  card: {
    width: cardSize,
    height: cardSize + 10,
    borderRadius: 20,
    backgroundColor: '#fffffffa', // Pure white background
    borderWidth: 2, 
    borderColor: 'rgba(246, 3, 84, 1)',
    shadowColor: 'rgba(233, 42, 106, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 50, // Default size - will be overridden by individual iconSize
    height: 50, // Default size - will be overridden by individual iconSize
    marginBottom: 15,
    opacity: 0.9,
  },
  cardText: {
    fontSize: 18,
    color: '#000000', // Black text color
    fontWeight: '700',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    opacity: 0.8,
    fontWeight: '400',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCardContainer: {
    margin: 20,
  },
  profileCard: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    minWidth: 280,
    shadowColor: '#be185d',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  },
  profileCardHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileCardIcon: {
    width: 60,
    height: 60,
    tintColor: '#be185d',
    marginBottom: 15,
  },
  profileCardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#be185d',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#be185d',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#be185d',
  },
  logoutIcon: {
    width: 20,
    height: 20,
    tintColor: '#e3e1e2ff',
    marginRight: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});