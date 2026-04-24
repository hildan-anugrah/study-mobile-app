import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ganti 'localhost' dengan IP lokal Anda jika menjalankan di HP fisik
// Contoh: 'http://192.168.1.100/jwt/api/'
const apiClient = axios.create({
  baseURL: 'http://10.61.4.188/jwt-project/backend/api/',
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor: otomatis sisipkan token JWT ke setiap request
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
