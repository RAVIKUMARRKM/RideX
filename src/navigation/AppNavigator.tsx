import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuthStore} from '../store/authStore';

// Auth Screens
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Main Screens
import HomeScreen from '../screens/main/HomeScreen';
import DestinationScreen from '../screens/main/DestinationScreen';
import RideConfirmScreen from '../screens/main/RideConfirmScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import RideTrackingScreen from '../screens/main/RideTrackingScreen';
import RideHistoryScreen from '../screens/main/RideHistoryScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  OTP: {phoneNumber: string};
  Register: {phoneNumber: string};
  Home: undefined;
  Destination: undefined;
  RideConfirm: {
    pickup: {latitude: number; longitude: number; address: string};
    destination: {latitude: number; longitude: number; address: string};
  };
  Profile: undefined;
  RideTracking: {
    rideId: number;
    pickup: {latitude: number; longitude: number; address: string};
    destination: {latitude: number; longitude: number; address: string};
  };
  RideHistory: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const {isAuthenticated, isLoading} = useAuthStore();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#fff'},
      }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Destination" component={DestinationScreen} />
          <Stack.Screen name="RideConfirm" component={RideConfirmScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="RideTracking" component={RideTrackingScreen} />
          <Stack.Screen name="RideHistory" component={RideHistoryScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
