// app/login.tsx
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
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

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password');
    } else {
      setError('');
      router.replace('/MainHomeScreen');
    }
  };

  return (
    <KeyboardAvoidingView
       style={styles.container}
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // now works for Android too
       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // optional, adjust for headers
    >

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Top Card Section with Icon */}
        <View style={styles.topCard}>
          <FontAwesome5 name="users" size={48} color="#fff" />
          <Text style={styles.topCardText}>User Login</Text>
        </View>

        {/* Login Form Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>

          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#888"
          />

          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#888"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.poweredByTextCard}>
            {/* Footer Text */}
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
  container: {
    flex: 1,
    backgroundColor: '#f2f6ff',
  },
  scrollContainer: {
    flexGrow: 1,
    
  },
  topCard: {
    backgroundColor: '#8c103cff',
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 60,
  },
  topCardText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
    fontWeight: '600',
  },
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
  input: {
    backgroundColor: '#f2ebebff',
    borderRadius: 10,
    padding: 18,
    marginBottom: 16,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#8c103cff',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  poweredByTextCard: {
    paddingTop:20,
  },
  poweredByText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 12,
    color: '#888',
    marginTop: 10,
    marginBottom: 10,   
  }
});
