import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing JWT token
import commonStyles from '../styles/commonStyles';
import { StackNavigationProp } from '@react-navigation/stack'; // Import StackNavigationProp

// Define types for your navigation
type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const API_URL = 'http://192.168.158.156:5000/api/auth/signup'; // Backend URL

// Define the SignUpScreen component with navigation prop typed
const SignUpScreen: React.FC<{ navigation: SignUpScreenNavigationProp }> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async () => {
    try {
      // Send sign-up request to backend
      const response = await axios.post(`${API_URL}/signup`, {
        email: email,
        username: username,
        password: password,
      });
      const { token } = response.data; // Extract JWT token from response

      // Store JWT token in AsyncStorage
      await AsyncStorage.setItem('userToken', token);

      navigation.replace('MainTabs'); // Navigate to the main screen after successful sign-up
    } catch (error) {
      Alert.alert('Sign Up Failed', 'There was an error during sign-up');
    }
  };

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={commonStyles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="#1E88E5" style={styles.icon} />
          <TextInput
            style={commonStyles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#1E88E5" style={styles.icon} />
          <TextInput
            style={commonStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#1E88E5" style={styles.icon} />
          <TextInput
            style={commonStyles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={commonStyles.button} onPress={handleSignUp}>
          <Text style={commonStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Link to login */}
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
  linkContainer: {
    marginTop: 20,
  },
  linkText: {
    color: '#2575fc',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});

export default SignUpScreen;
