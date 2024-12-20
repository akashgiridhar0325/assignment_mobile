import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'; // Added to handle navigation
import commonStyles from '../styles/commonStyles';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      navigation.replace('Main'); // Replace with your main screen name
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={commonStyles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome</Text>
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
          <Icon name="lock" size={20} color="#1E88E5" style={styles.icon} />
          <TextInput
            style={commonStyles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={commonStyles.button} onPress={handleLogin}>
          <Text style={commonStyles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Forgot Password and Sign Up Links */}
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '85%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    position: 'absolute',
    left: 10,
  },
  linkContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkText: {
    fontSize: 14,
    color: '#1E88E5',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
