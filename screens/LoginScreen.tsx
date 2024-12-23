import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing JWT token
import { StackNavigationProp } from '@react-navigation/stack'; // Import StackNavigationProp
import { loginUser } from '../api';  // Relative path


// Define types for your navigation
type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const API_URL = 'http://192.168.158.156:5000/api/auth/login';  // Correct API URL

const LoginScreen: React.FC<{ navigation: LoginScreenNavigationProp }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the login request
  const handleLogin = async () => {
    try {
      const { token, username } = await loginUser(email, password); // Use destructuring
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('username', username);
      navigation.replace('MainTabs');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'There was an issue logging in.');
    }
  };
  

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#1E88E5" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#1E88E5" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Link to Sign Up */}
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Link to Forgot Password */}
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    width: '100%',
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#2575fc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 10,
  },
  linkText: {
    color: '#2575fc',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});

export default LoginScreen;
