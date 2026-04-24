import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import apiClient from '../api/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  const executeLogout = async () => {
    try {
      await apiClient.post('/logout.php');
    } catch (err) {
      console.log('Logout API error:', err);
    } finally {
      await AsyncStorage.removeItem('jwt');
      if (navigation) navigation.replace('Login');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get('/profile.php');
        setUserData(response.data.user);
      } catch (err) {
        const msg = err.response?.data?.message || 'Gagal memuat profil.';
        setError(msg);
        // Jika token expired / invalid, arahkan ke Login
        if (err.response?.status === 401) {
          await AsyncStorage.removeItem('jwt');
          setTimeout(() => {
            if (navigation) navigation.replace('Login');
          }, 2000);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Apakah Anda yakin ingin logout?')) {
        await executeLogout();
      }
    } else {
      Alert.alert('Konfirmasi', 'Apakah Anda yakin ingin logout?', [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: executeLogout
        }
      ]);
    }
  };


  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Memuat profil...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <Text style={styles.subText}>Mengarahkan ke halaman login...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Avatar placeholder */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {userData?.name?.charAt(0).toUpperCase()}
        </Text>
      </View>

      <Text style={styles.welcome}>Selamat datang!</Text>
      <Text style={styles.name}>{userData?.name}</Text>

      <View style={styles.infoCard}>
        <InfoRow label="Email" value={userData?.email} />
        <InfoRow label="User ID" value={String(userData?.id)} />
      </View>

      <View style={styles.tokenBadge}>
        <Text style={styles.tokenText}>✅ Token JWT Valid & Aktif</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 24,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 16,
    shadowColor: '#4f46e5',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  avatarText: { fontSize: 38, color: '#fff', fontWeight: '700' },
  welcome: { fontSize: 14, color: '#6b7280', marginBottom: 4 },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 24,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#f3f4f6',
    borderBottomWidth: 1,
  },
  infoLabel: { fontSize: 14, color: '#6b7280', fontWeight: '600' },
  infoValue: { fontSize: 14, color: '#111827' },
  tokenBadge: {
    backgroundColor: '#ecfdf5',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 32,
  },
  tokenText: { color: '#065f46', fontSize: 13, fontWeight: '600' },
  logoutBtn: {
    backgroundColor: '#dc2626',
    borderRadius: 10,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  loadingText: { marginTop: 12, color: '#6b7280' },
  errorText: { color: '#dc2626', fontSize: 15, marginBottom: 8 },
  subText: { color: '#9ca3af', fontSize: 13 },
});

export default ProfileScreen;
