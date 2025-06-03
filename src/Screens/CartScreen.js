import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Images from '../res/assets'

export default class CartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [
        {
          id: '1',
          name: 'Red T-Shirt',
          price: 20,
          quantity: 2,
          image: Images.product1,
        },
        // Add more cart items as needed
      ],
    };
  }

  renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>Rs{item.price} x {item.quantity}</Text>
      </View>
    </View>
  );

  render() {
    const totalPrice = this.state.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.cartItems}
          renderItem={this.renderCartItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${totalPrice}</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  cartItem: { flexDirection: 'row', marginBottom: 10 },
  cartItemImage: { width: 60, height: 60, borderRadius: 5 },
  cartItemInfo: { marginLeft: 10, justifyContent: 'center' },
  cartItemName: { fontSize: 16 },
  cartItemPrice: { fontSize: 14, color: '#888' },
  totalContainer: { borderTopWidth: 1, borderColor: '#ccc', paddingTop: 10 },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  checkoutButton: {
    marginTop: 10,
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontSize: 16 },
});
