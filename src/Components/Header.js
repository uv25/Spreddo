import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // Using Ionicons

export const Header = ({ title = "ShopEasy", showCart = true, cartCount = 0 }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Left Icon (Menu) */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon name="menu" size={28} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Icon (Cart with Badge) */}
      {showCart && (
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <View style={styles.cartContainer}>
            <Icon name="cart-outline" size={28} color="black" />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 3, // Shadow for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cartContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

