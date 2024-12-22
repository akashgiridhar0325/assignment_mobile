import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import MainTabs from './screens/MainTabs'; // Import your tab navigation

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      {/* Auth Screens */}
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />

      {/* Main App with Tab Navigation */}
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
// types.ts or inside Navigation.tsx
export type RootTabParamList = {
  Home: undefined; // no params for Home screen
  Profile: undefined; // no params for Profile screen
  Notifications: undefined; // no params for Notifications screen
};


export default Navigation;
