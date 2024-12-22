import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DynamicScreen from './DynamicScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Define the RootTabParamList to include all your screens
type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
  Notifications: undefined;
};

const Tab = createBottomTabNavigator();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0 },
        headerShown: true, // Enable header globally for tab screens
      }}
    >
      <Tab.Screen
        name="Home"
        component={DynamicScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={DynamicScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="person" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={DynamicScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="notifications" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
