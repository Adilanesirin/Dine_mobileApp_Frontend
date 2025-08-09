import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const gridItems = [
  {
    title: 'Sales',
    icon: { uri: 'https://cdn.pixabay.com/photo/2015/10/31/12/41/sale-1015710_1280.jpg' },
    iconSize: { width: 90, height: 90 },
  },
  {
    title: 'Menu',
    icon: { uri: 'https://www.pngkey.com/png/detail/38-381514_clip-free-stock-menu-supreme-logo-suprem-restaurant.png' },
    iconSize: { width: 100, height: 96 },
  },
  {
    title: 'Cancelled Bills',
    icon: { uri: 'https://pnghq.com/wp-content/uploads/cancelled-stamp-free-png-images-350x268.png' },
    iconSize: { width: 60, height: 60 },
  },
  {
    title: 'Data Summary',
    icon: { uri: 'https://img.freepik.com/fotos-premium/grafico-negocios-colorido-grafico-circular-aislado_241146-863.jpg' },
    iconSize: { width: 70, height: 70 },
  },
];

export default function DashboardScreen() {
  const router = useRouter();

  const handlePress = (title) => {
    if(title==='Sales') {
      router.push('/summary');
    }else{
    console.log(`${title} pressed`);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#e1116bff" />
      <LinearGradient
        colors={['#8c103cff', '#8c103cff', '#8c103cff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* Header with Back Button */}
        <View style={styles.topHeader}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image 
              source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/back.png' }} 
              style={styles.backIcon} 
            />
          </TouchableOpacity>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.header}>Dashboard</Text>
          <Text style={styles.subHeader}>Manage your restaurant operations</Text>
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
                    onPress={() => handlePress(item.title)}
                    activeOpacity={0.8}
                  >
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
                    <Text style={styles.cardText}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Select an option to manage your restaurant</Text>
        </View>
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
  
  backIcon: {
    width: 32,
    height: 32,
    tintColor: '#fff',
  },
  headerSpacer: {
    width: 48, // Same width as back button to keep header centered
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
});