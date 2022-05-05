import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ProductItem from "../../Components/ProductItem";
import { DataStore } from "aws-amplify";
import { Product } from "../../src/models";

// import products from "../../data/products";

export default function HomeScreen({ searchValue }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    DataStore.query(Product).then(setProducts);
  }, []);
  return (
    <View style={styles.page}>
      {/* {products.map(product => (
                <ProductItem key={product.id} product={product} />
            ))} */}
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
    margin: 3,
  },
});
