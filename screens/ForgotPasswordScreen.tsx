import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'; // Importing StackNavigationProp type
import commonStyles from '../styles/commonStyles'; // Common styles for consistency

type ForgotPasswordScreenNavigationProp = StackNavigationProp<any, 'ForgotPassword'>;

interface Props {
  navigation: ForgotPasswordScreenNavigationProp;
}

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forgot your password? Please check your email to reset it.</Text>

      {/* Back to Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}  // Navigates back to the Login screen
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
