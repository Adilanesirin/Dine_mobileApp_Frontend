import { useRouter } from 'expo-router'; // if using Expo Router
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('token');

      if (token) {
        router.replace('/dashboard'); // if token exists → go to dashboard
      } else {
        router.replace('/LicenseScreen');   // if not → go to license screen
      }
    };

    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007bff" />
      <Text style={styles.text}>Checking license...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                      
    justifyContent: 'center',     
    alignItems: 'center',         
    backgroundColor: '#f0f4f8',  
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginTop: 12,
    color: '#333',
  },
});
