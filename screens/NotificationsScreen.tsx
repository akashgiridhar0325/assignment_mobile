import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack'; // Importing StackNavigationProp type
import commonStyles from '../styles/commonStyles'; // Common styles for consistency

type ProfileScreenNavigationProp = StackNavigationProp<any, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  // Set the logout button in the top-right corner when the screen is loaded
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true, // Ensure header is shown
      headerTitle: 'Notifications', // Set a title for the header
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Logout handler with confirmation
  const handleLogout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => navigation.replace('Login'), // Redirect to Login Screen
      },
    ]);
  };

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={commonStyles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Welcome to the Notifications Screen!</Text>
      </View>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    marginRight: 10, // Space from the right edge
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FF3B30', // Red background for better visibility
    borderRadius: 5,
    alignSelf: 'center', // Ensure it aligns at the top-right
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // White text for better contrast against the red background
  },
});
