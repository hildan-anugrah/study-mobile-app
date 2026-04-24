import React, { useState } from 'react';
import { View, TextInput, Button, Image, ScrollView, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import apiClient from '../api/config';

export default function AddEditProductScreen({ navigation }) {
    const [product, setProduct] = useState({ 
        sku: '',
        name: '', 
        price: '', 
        stock: '',
        description: '',
        category_id: '1' // Default to 1 (Makanan) as per sample data
    });
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ 
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const saveProduct = async () => {
        if (!product.name || !product.price || !product.stock) {
            Alert.alert('Error', 'Nama, Harga, dan Stok harus diisi.');
            return;
        }

        const formData = new FormData();
        formData.append('sku', product.sku);
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('stock', product.stock);
        formData.append('description', product.description);
        formData.append('category_id', product.category_id);
        
        if (imageUri) {
            let filename = imageUri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            formData.append('image', { uri: imageUri, name: filename, type });
        }
        
        try {
            setLoading(true);
            await apiClient.post('/products.php', formData, { 
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            Alert.alert('Sukses', 'Produk berhasil disimpan');
            navigation.goBack();
        } catch (error) { 
            console.error(error);
            Alert.alert('Error', 'Gagal menyimpan produk'); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <View style={styles.formGroup}>
                <Text style={styles.label}>SKU</Text>
                <TextInput 
                    placeholder="Contoh: FD001" 
                    value={product.sku}
                    onChangeText={t => setProduct({...product, sku: t})} 
                    style={styles.input} 
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Nama Produk *</Text>
                <TextInput 
                    placeholder="Nama Produk" 
                    value={product.name}
                    onChangeText={t => setProduct({...product, name: t})} 
                    style={styles.input} 
                />
            </View>

            <View style={styles.row}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.label}>Harga *</Text>
                    <TextInput 
                        placeholder="0" 
                        keyboardType="numeric" 
                        value={product.price}
                        onChangeText={t => setProduct({...product, price: t})} 
                        style={styles.input} 
                    />
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Stok *</Text>
                    <TextInput 
                        placeholder="0" 
                        keyboardType="numeric" 
                        value={product.stock}
                        onChangeText={t => setProduct({...product, stock: t})} 
                        style={styles.input} 
                    />
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Deskripsi</Text>
                <TextInput 
                    placeholder="Deskripsi produk..." 
                    multiline
                    numberOfLines={3}
                    value={product.description}
                    onChangeText={t => setProduct({...product, description: t})} 
                    style={[styles.input, { height: 80, textAlignVertical: 'top' }]} 
                />
            </View>

            <View style={styles.imageContainer}>
                <Text style={styles.label}>Gambar Produk</Text>
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.previewImage} />
                    ) : (
                        <View style={styles.placeholderIcon}>
                            <Text style={{ color: '#9ca3af' }}>Pilih Gambar</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20 }}>
                <Button 
                    title={loading ? "Menyimpan..." : "Simpan Produk"} 
                    onPress={saveProduct} 
                    disabled={loading}
                    color="#4f46e5"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    formGroup: { marginBottom: 15 },
    row: { flexDirection: 'row' },
    label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 5 },
    input: { 
        borderWidth: 1, 
        borderColor: '#d1d5db', 
        padding: 12, 
        borderRadius: 8, 
        fontSize: 16,
        backgroundColor: '#f9fafb'
    },
    imageContainer: { marginVertical: 10 },
    imagePicker: { 
        width: '100%', 
        height: 200, 
        borderWidth: 1, 
        borderColor: '#d1d5db', 
        borderStyle: 'dashed', 
        borderRadius: 12, 
        justifyContent: 'center', 
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#f3f4f6'
    },
    previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    placeholderIcon: { alignItems: 'center' }
});
