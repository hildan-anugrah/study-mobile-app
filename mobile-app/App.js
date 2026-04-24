import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(null); // null = loading

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('jwt');
      setCurrentScreen(token ? 'Profile' : 'Login');
    };
    checkToken();
  }, []);

  const fakeNavigation = {
    replace: (screenName) => setCurrentScreen(screenName)
  };

  // Tampilkan loading spinner saat cek token
  if (currentScreen === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {currentScreen === 'Login'
        ? <LoginScreen navigation={fakeNavigation} />
        : <ProfileScreen navigation={fakeNavigation} />
      }
    </SafeAreaView>
  );
}
