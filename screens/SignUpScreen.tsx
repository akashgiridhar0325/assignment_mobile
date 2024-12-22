import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../styles/commonStyles';

type SignUpScreenNavigationProp = StackNavigationProp<any, 'SignUp'>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);

  useEffect(() => {
    // Check password validation
    const checkPassword = () => {
      const length = password.length >= 8;
      const uppercase = /[A-Z]/.test(password);
      const number = /\d/.test(password);
      const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      setPasswordStrength({ length, uppercase, number, specialChar });
      setIsPasswordValid(length && uppercase && number && specialChar);
    };

    checkPassword();
  }, [password]);

  useEffect(() => {
    // Check if passwords match
    setDoPasswordsMatch(password === confirmPassword);
  }, [confirmPassword, password]);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
    } else {
      // Handle the sign-up logic here (e.g., send data to the backend)
      Alert.alert('Success', 'Sign up successful!');
      navigation.replace('Login'); // Redirect to Login after successful sign-up
    }
  };

  const handleEmailChange = (email: string) => {
    setEmail(email);
    // Basic email validation using a simple regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setIsValidEmail(emailRegex.test(email));
  };

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={commonStyles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create an Account</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#1E88E5" style={styles.icon} />
          <TextInput
            style={commonStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
          />
        </View>
        {/* Email Validation */}
        <Text style={[styles.validationText, isValidEmail ? styles.valid : styles.invalid]}>
          {isValidEmail ? 'Valid Email' : 'Invalid Email Format'}
        </Text>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#1E88E5" style={styles.icon} />
          <TextInput
            style={commonStyles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Password Validation Rules */}
        <View style={styles.rulesContainer}>
          <Text style={styles.rulesTitle}>Password Requirements:</Text>
          <Text style={[styles.rule, passwordStrength.length ? styles.valid : styles.invalid]}>
            - Minimum 8 characters
          </Text>
          <Text style={[styles.rule, passwordStrength.uppercase ? styles.valid : styles.invalid]}>
            - At least one uppercase letter
          </Text>
          <Text style={[styles.rule, passwordStrength.number ? styles.valid : styles.invalid]}>
            - At least one number
          </Text>
          <Text style={[styles.rule, passwordStrength.specialChar ? styles.valid : styles.invalid]}>
            - At least one special character
          </Text>
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#1E88E5" style={styles.icon} />
          <TextInput
            style={commonStyles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        {/* Password Match Validation */}
        <Text style={[styles.validationText, doPasswordsMatch ? styles.valid : styles.invalid]}>
          {doPasswordsMatch ? 'Passwords match' : 'Passwords do not match'}
        </Text>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.button, !isValidEmail || !isPasswordValid || !doPasswordsMatch ? styles.disabledButton : {}]}
          onPress={handleSignUp}
          disabled={!isValidEmail || !isPasswordValid || !doPasswordsMatch}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Back to Login Button */}
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
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
  rulesContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  rulesTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rule: {
    fontSize: 14,
    marginBottom: 5,
  },
  validationText: {
    fontSize: 14,
    marginTop: 5,
  },
  valid: {
    color: 'green',
  },
  invalid: {
    color: 'red',
  },
  button: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#FF3B30', // Red for Back button to differentiate it
  },
});

export default SignUpScreen;
