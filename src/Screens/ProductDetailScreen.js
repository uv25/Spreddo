import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Images from '../res/assets'

export default class ProductDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: 'Red T-Shirt',
        price: 20,
        description: 'Comfortable and stylish red t-shirt made from 100% cotton.',
        images: [
          Images.product1,
          Images.product2,
          // Add more images as needed
        ],
      },
    };
  }

  render() {
    const { product } = this.state;
    return (
      <ScrollView style={styles.container}>
        <ScrollView horizontal pagingEnabled>
          {product.images.map((image, index) => (
            <Image key={index} source={image} style={styles.productImage} />
          ))}
        </ScrollView>
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  productImage: { width: '100%', height: 300 },
  infoContainer: { padding: 20 },
  productName: { fontSize: 24, fontWeight: 'bold' },
  productPrice: { fontSize: 20, color: '#888', marginVertical: 10 },
  productDescription: { fontSize: 16, lineHeight: 22 },
  addToCartButton: {
    marginTop: 20,
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartText: { color: '#fff', fontSize: 16 },
});
