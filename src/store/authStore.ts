import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface User {
  id: string;
  phoneNumber: string;
  fullName: string;
  email?: string;
  profilePhoto?: string;
  role: 'rider' | 'driver';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNumber: string, password: string) => Promise<void>;
  verifyOTP: (phoneNumber: string, otp: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userStr = await AsyncStorage.getItem('user');

      if (token && userStr) {
        const user = JSON.parse(userStr);
        set({token, user, isAuthenticated: true, isLoading: false});
      } else {
        set({isLoading: false});
      }
    } catch (error) {
      console.error('Check auth error:', error);
      set({isLoading: false});
    }
  },

  login: async (phoneNumber: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {phoneNumber, password});
      const {token, user} = response.data;

      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      set({token, user, isAuthenticated: true});
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  verifyOTP: async (phoneNumber: string, otp: string) => {
    try {
      const response = await api.post('/auth/verify-otp', {phoneNumber, otp});
      const {token, user} = response.data;

      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      set({token, user, isAuthenticated: true});
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  },

  register: async (userData: any) => {
    try {
      const response = await api.post('/auth/register', userData);
      const {token, user} = response.data;

      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      set({token, user, isAuthenticated: true});
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      set({token: null, user: null, isAuthenticated: false});
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  setUser: (user: User) => {
    set({user});
    AsyncStorage.setItem('user', JSON.stringify(user));
  },
}));
