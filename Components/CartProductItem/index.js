import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import FontAweSome from "react-native-vector-icons/FontAwesome";
import QuantitySelector from "../../Components/QuantitySelector";
import { DataStore } from "aws-amplify";

import { CartProduct } from "../../src/models";

export default function CartProductItem({ cartItem }) {
  const { product, ...cartProduct } = cartItem;

  const updateQuantity = async (newQuantity) => {
    const original = await DataStore.query(CartProduct, cartProduct.id);

    await DataStore.save(
      CartProduct.copyOf(original, (updated) => {
        updated.quantity = newQuantity;
      })
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image style={styles.image} source={{ uri: product.image }} />
        <View style={styles.rightContainor}>
          <Text style={styles.title} numberOfLines={3}>
            {" "}
            {product.title}{" "}
          </Text>
          <View style={styles.rating}>
            {[0, 0, 0, 0, 0].map((el, i) => (
              <FontAweSome
                key={`${product.id}-${i}`}
                style={styles.star}
                name={i < Math.floor(product.avgRating) ? "star" : "star-o"}
                size={16}
                color="#ffd700"
              />
            ))}

            <Text> {product.ratings} </Text>
          </View>
          <Text style={styles.price}> from ${product.price} </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <QuantitySelector
          quantity={cartProduct.quantity}
          setQuantity={updateQuantity}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
  },

  row: {
    flexDirection: "row",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    flex: 2,
  },
  rightContainor: {
    padding: 10,
    flex: 3,
  },
  title: {
    fontSize: 16,
  },
  description: {},
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  star: {
    margin: 2,
  },
  quantityContainer: {
    marginVertical: 10,
    marginLeft: 30,
  },
});
