import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default function LicenseScreen() {
  const router = useRouter();
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = () => {
    if (licenseKey.trim() === '') {
      setError('Please enter your license key');
    } else {
      setError('');
      router.replace('/LoginScreen');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/dine-bg.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <BlurView intensity={80} tint="light" style={styles.card}>
            <Image
              source={require('../assets/images/dine-logo.png')}
              style={styles.logo}
            />

            <Text style={styles.title}>License Activation</Text>
            <Text style={styles.subtitle}>Enter your license key to proceed.</Text>

            <TextInput
              style={styles.input}
              placeholder="LICENSE-XXXX-KEY"
              value={licenseKey}
              onChangeText={setLicenseKey}
              placeholderTextColor="#aaa"
              autoCapitalize="characters"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Activate</Text>
            </TouchableOpacity>

            {error !== '' && <Text style={styles.error}>{error}</Text>}
          </BlurView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    padding: 28,
    borderRadius: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(244, 240, 240, 0.53)',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.24)',
    color: '#fff',
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ab2548ff',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignSelf: 'center',
    minWidth: 120,
    maxWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  error: {
    color: '#ffcccc',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
});