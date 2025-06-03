import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
 
// WooCommerce API configuration
const STORE_URL = 'https://spreddo.com';
const CONSUMER_KEY = 'ck_a1c7269ada431e763434c24a009288960985978a';
const CONSUMER_SECRET = 'cs_1808386a8515e362190ea304f23b762bf9892d6c';
 
 
const ProfileScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);
 
  // Fetch products when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory.id);
    }
  }, [selectedCategory]);
 
  // Function to fetch categories from WooCommerce API
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${STORE_URL}/wp-json/wc/v3/products/categories`,
        {
          params: {
            consumer_key: CONSUMER_KEY,
            consumer_secret: CONSUMER_SECRET,
            per_page: 100,
          },
        }
      );
      setCategories(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch categories: ' + err.message);
      setLoading(false);
    }
  };
 
  // Function to fetch products by category ID
  const fetchProductsByCategory = async (categoryId) => {
    setLoading(true);
    setProducts([]);
    try {
      const response = await axios.get(
        `${STORE_URL}/wp-json/wc/v3/products`,
        {
          params: {
            consumer_key: CONSUMER_KEY,
            consumer_secret: CONSUMER_SECRET,
            category: categoryId,
            per_page: 100,
          },
        }
      );
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products: ' + err.message);
      setLoading(false);
    }
  };
 
  // Render category item
  const renderCategoryItem = ({ item }) => (
<TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory?.id === item.id && styles.selectedCategoryItem,
      ]}
      onPress={() => setSelectedCategory(item)}
>
<Text
        style={[
          styles.categoryText,
          selectedCategory?.id === item.id && styles.selectedCategoryText,
        ]}
>
        {item.name}
</Text>
</TouchableOpacity>
  );
 
  // Render product item
  const renderProductItem = ({ item }) => (
<View style={styles.productItem}>
<Image
        source={{ uri: item.images[0]?.src || 'https://via.placeholder.com/100' }}
        style={styles.productImage}
      />
<View style={styles.productInfo}>
<Text style={styles.productName}>{item.name}</Text>
<Text style={styles.productPrice}>
          ₹{parseFloat(item.price).toFixed(2)}
</Text>
</View>
</View>
  );
 
  if (error) {
    return (
<SafeAreaView style={styles.container}>
<Text style={styles.errorText}>{error}</Text>
<TouchableOpacity style={styles.retryButton} onPress={fetchCategories}>
<Text style={styles.retryButtonText}>Retry</Text>
</TouchableOpacity>
</SafeAreaView>
    );
  }
 
  return (
<SafeAreaView style={styles.container}>
<Text style={styles.title}>WooCommerce Store</Text>
      {/* Categories List */}
<Text style={styles.sectionTitle}>Categories</Text>
<FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
      />
 
      {/* Products List */}
<Text style={styles.sectionTitle}>
        {selectedCategory ? `Products in ${selectedCategory.name}` : 'Select a category to view products'}
</Text>
      {loading ? (
<ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
<FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.productList}
          ListEmptyComponent={
            !loading && selectedCategory ? (
<Text style={styles.emptyText}>No products found in this category</Text>
            ) : null
          }
        />
      )}
</SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 8,
    color: '#555',
  },
  categoryList: {
    maxHeight: 60,
    marginBottom: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
  },
  selectedCategoryItem: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  productList: {
    paddingBottom: 16,
  },
  productItem: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#eee',
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
  },
  loader: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6c757d',
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#dc3545',
    fontSize: 16,
  },
  retryButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007bff',
    borderRadius: 4,
    alignSelf: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
 
export default ProfileScreen;