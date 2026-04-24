import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';
import apiClient from '../api/config';
import { useIsFocused } from '@react-navigation/native';

export default function ProductListScreen({ navigation }) {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await apiClient.get(`/products.php?search=${search}`);
            setProducts(res.data);
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        if (isFocused) fetchProducts(); 
    }, [isFocused, search]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput 
                    placeholder="Cari produk..." 
                    value={search} 
                    onChangeText={setSearch} 
                    style={styles.searchInput} 
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#4f46e5" style={{ flex: 1 }} />
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.productCard} 
                            onPress={() => navigation.navigate('AddEditProduct', { id: item.id })}
                        >
                            <Image 
                                source={{ uri: item.image_url ? `http://10.0.2.2/jwt-project/backend/${item.image_url}` : 'https://via.placeholder.com/50' }} 
                                style={styles.productImage} 
                            />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productSku}>{item.sku || 'No SKU'}</Text>
                                <Text style={styles.productPrice}>Rp. {parseFloat(item.price).toLocaleString()}</Text>
                                <Text style={styles.productCategory}>Kategori: {item.category_name || 'Uncategorized'}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={<Text style={styles.emptyText}>Tidak ada produk ditemukan.</Text>}
                />
            )}
            
            <View style={styles.fab}>
                <Button 
                    title="Tambah Produk" 
                    onPress={() => navigation.navigate('AddEditProduct')} 
                    color="#4f46e5"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f8' },
    header: { padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
    searchInput: { padding: 12, backgroundColor: '#f3f4f6', borderRadius: 8, fontSize: 16 },
    productCard: { 
        flexDirection: 'row', 
        padding: 15, 
        backgroundColor: '#fff', 
        marginHorizontal: 10, 
        marginTop: 10, 
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2
    },
    productImage: { width: 70, height: 70, borderRadius: 8, backgroundColor: '#f3f4f6' },
    productInfo: { marginLeft: 15, flex: 1, justifyContent: 'center' },
    productName: { fontSize: 16, fontWeight: '700', color: '#1f2937' },
    productSku: { fontSize: 12, color: '#6b7280', marginVertical: 2 },
    productPrice: { fontSize: 14, fontWeight: '600', color: '#4f46e5' },
    productCategory: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
    emptyText: { textAlign: 'center', marginTop: 50, color: '#6b7280' },
    fab: { position: 'absolute', bottom: 20, left: 20, right: 20 }
});
