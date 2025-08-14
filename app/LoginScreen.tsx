import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';


const { height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { id: username.trim(), pass_field: password.trim() });
      
      const response = await fetch('https://dinewebappapi.sysmac.in/api/users/', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      console.log('Response status:', response.status);

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed response data:', data);
      } catch (parseError) {
        console.log('Failed to parse JSON:', parseError);
        setError(`Server returned invalid response: ${responseText.substring(0, 100)}`);
        return;
      }

      if (response.ok) {
        if (Array.isArray(data)) {
          const matchingUser = data.find(user => 
            user.id === username.trim() && user.pass_field === password.trim()
          );
          
          if (matchingUser) {
            try {
              await SecureStore.setItemAsync('userToken', JSON.stringify({
                id: matchingUser.id,
                loginTime: new Date().toISOString()
              }));
              console.log('Login successful for user:', matchingUser.id);
              setTimeout(() => router.replace('/MainHomeScreen'), 100);
            } catch (storeError) {
              console.error('Error saving to SecureStore:', storeError);
              router.replace('/MainHomeScreen');
            }
          } else {
            const userExists = data.find(user => user.id === username.trim());
            if (userExists) {
              setError('Incorrect password. Please try again.');
            } else {
              setError('Username not found. Please check your credentials.');
            }
          }
        } else {
          setError('Server returned unexpected data format');
        }
      } else {
        const errorMessage = data?.message || data?.error || `HTTP ${response.status}`;
        if (response.status === 401 || response.status === 403) {
          setError(`Invalid username or password (${errorMessage})`);
        } else if (response.status === 404) {
          setError(`User not found (${errorMessage})`);
        } else if (response.status === 500) {
          setError(`Server error (${errorMessage})`);
        } else {
          setError(`Login failed: ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.message.includes('Network request failed') || error.message.includes('fetch')) {
        setError('Network error. Please check your internet connection.');
      } else if (error.message.includes('timeout')) {
        setError('Request timeout. Please try again.');
      } else {
        setError(`Connection error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <KeyboardAvoidingView
       style={styles.container}
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Top Card Section */}
        <View style={styles.topCard}>
          <FontAwesome5 name="users" size={70} color="#fff" />
          <Text style={styles.topCardText}>User Login</Text>
        </View>

        {/* Login Form */}
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>

          {/* Username with Icon */}
          <View style={styles.inputContainer}>
            <FontAwesome5 name="user" size={18} color="#888" style={styles.inputIcon} />
            <TextInput
              placeholder="Username"
              style={styles.inputField}
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#888"
              editable={!isLoading}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password with Icon */}
          <View style={styles.inputContainer}>
            <FontAwesome5 name="lock" size={18} color="#888" style={styles.inputIcon} />
            <TextInput
              placeholder="Password"
              style={styles.inputField}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#888"
              editable={!isLoading}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={togglePasswordVisibility}
              disabled={isLoading}
            >
              <FontAwesome5 
                name={showPassword ? "eye-slash" : "eye"} 
                size={18} 
                color="#888" 
              />
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.buttonText}>Logging in...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.poweredByTextCard}>
            <Text style={styles.poweredByText}>
              Powered by IMC Business Solutions
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}  

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f6ffff' },
  scrollContainer: { flexGrow: 1 },
  topCard: {
    backgroundColor: '#8c103cff',
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 60,
  },
  topCardText: { color: '#fff', fontSize: 20, marginTop: 10, fontWeight: '600' },
  card: {
    backgroundColor: '#fff',
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 10,
    elevation: 10,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2ebebff',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  inputIcon: { marginRight: 10 },
  inputField: { flex: 1, fontSize: 16, paddingVertical: 14 },
  eyeIcon: { padding: 5 },
  errorText: { color: 'red', marginBottom: 12, textAlign: 'center' },
  button: {
    backgroundColor: '#8c103cff',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: { backgroundColor: '#cccccc' },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: '800' },
  loadingContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  poweredByTextCard: { paddingTop: 150 },
  poweredByText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 12,
    color: '#888',
    marginTop: 10,
    marginBottom: 10,   
  }
});
