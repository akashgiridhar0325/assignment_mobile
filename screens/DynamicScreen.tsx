import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootTabParamList } from '../Navigation'; // Import RootTabParamList

type DynamicScreenProps = {
  navigation: BottomTabNavigationProp<RootTabParamList, 'Home'>; // Use RootTabParamList here
  route: any;
};

const DynamicScreen: React.FC<DynamicScreenProps> = ({ navigation, route }) => {
  const { name } = route;

  // Use StackNavigationProp here for navigating to Login screen
  const stackNavigation = useNavigation<StackNavigationProp<any>>(); 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, name]);

  const handleLogout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          stackNavigation.replace('Login'); // Correct navigation to Login screen
        },
      },
    ]);
  };

  let content = '';
  switch (name) {
    case 'Home':
      content = 'Welcome to the Home Screen!';
      break;
    case 'Profile':
      content = 'Welcome to the Profile Screen!';
      break;
    case 'Notifications':
      content = 'Here are your Notifications!';
      break;
    default:
      content = 'Page not found.';
  }

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>{content}</Text>
      </View>
    </LinearGradient>
  );
};

export default DynamicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
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
    marginRight: 10, // Adjust the margin to move it slightly into the header
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
