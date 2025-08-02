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

const gridItems = [
  {
    title: 'Dine',
    icon: 'https://img.icons8.com/ios-filled/50/e91e63/restaurant.png',
    route: '/dashboard'
  },
  {
    title: 'Star Stay',
    icon: 'https://img.icons8.com/ios-filled/50/e91e63/star.png',
    route: '/starstay'
  },
  {
    title: 'Accounts',
    icon: 'https://img.icons8.com/ios-filled/50/e91e63/accounting.png',
    route: '/accounts'
  },
  {
    title: 'Settings',
    icon: 'https://img.icons8.com/ios-filled/50/e91e63/settings.png',
    route: '/settings'
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
      // For other items, you can navigate to their respective pages
      // router.push(item.route);
      console.log(`Navigate to ${item.route}`);
    }
  };

  const handleProfilePress = () => {
    setShowProfileCard(true);
  };

  const handleLogout = () => {
    setShowProfileCard(false);
    router.replace('/LoginScreen'); // Navigate to login screen
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
                    <Image source={{ uri: item.icon }} style={styles.icon} />
                    <Text style={styles.cardText}>{item.title}</Text>
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
                  <Text style={styles.profileCardSubtitle}>Welcome back to the app</Text>
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
const cardSize = (screenWidth - 140) / 2; // Adjusted for glass container padding

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
  // Glass effect container styles
  glassContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 150,
    borderRadius: 25,
    overflow: 'hidden',
    // iOS shadow
    shadowColor: 'rgba(255, 255, 255, 0.3)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    // Android shadow
    elevation: 10,
  },
  glassBackground: {
    flex: 1,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    // Additional glass effect styling
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
    height: cardSize +10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white background
    borderWidth: 2, 
    borderColor: 'rgba(233, 42, 106, 0.3)', // More subtle border
    shadowColor: 'rgba(233, 42, 106, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    // Additional glass-like properties
    backdropFilter: 'blur(10px)', // Note: This may not work on all platforms
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 15,
    opacity: 0.9,
  },
  cardText: {
    fontSize: 18,
    color: '#be185d', 
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
  profileCardSubtitle: {
    fontSize: 16,
    color: '#802f5bff',
    textAlign: 'center',
    opacity: 0.9,
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