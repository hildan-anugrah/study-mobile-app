import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import AddEditProductScreen from './src/screens/AddEditProductScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null); // null = loading

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('jwt');
      setInitialRoute(token ? 'Profile' : 'Login');
    };
    checkToken();
  }, []);

  // Tampilkan loading spinner saat cek token
  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ title: 'My Profile' }}
          />
          <Stack.Screen 
            name="ProductList" 
            component={ProductListScreen} 
            options={{ title: 'Products' }} 
          />
          <Stack.Screen 
            name="AddEditProduct" 
            component={AddEditProductScreen} 
            options={{ title: 'Manage Product' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
