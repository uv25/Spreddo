import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '../Components/Header';
import Images from '../res/assets'

export default class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        { id: '1', name: 'Agarbatti', image: Images.category1 },
        { id: '2', name: 'Bed Sheets', image: Images.category2 },
        // Add more categories as needed
      ],
      featuredProducts: [
        { id: '1', name: 'Agarbatti Set', price: 200, image: Images.product1 },
        { id: '2', name: 'Agarbatti Set Fragrance', price: 400, image: Images.product2 },
        // Add more products as needed
      ],
    };
  }

  renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>Rs {item.price}</Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        {/* <Header title="Home" cartCount={3} /> */}
        <FlatList
          data={this.state.categories}
          renderItem={this.renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
        />
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <FlatList
          data={this.state.featuredProducts}
          renderItem={this.renderProduct}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.productList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  categoryList: {
    paddingVertical: 5, // was 10 — reduce this
    marginBottom: 5, // add if needed to space a bit
  },
  categoryCard: { alignItems: 'center', marginHorizontal: 10 },
  categoryImage: { width: 60, height: 60, borderRadius: 30 },
  categoryName: { marginTop: 5, fontSize: 14 },
  sectionTitle: {
    marginTop: 10, // was 20 — reduce top margin
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  productList: { paddingVertical: 10 },
  productCard: { width: 150, marginHorizontal: 10 },
  productImage: { width: '100%', height: 100, borderRadius: 8 },
  productName: { marginTop: 5, fontSize: 16 },
  productPrice: { fontSize: 14, color: '#888' },
});
