import React, { useState, useEffect } from "react";
import { Text, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRoute, useNavigation } from "@react-navigation/native";
import { DataStore, Auth } from "aws-amplify";
import { Product, CartProduct } from "../../src/models";

import styles from "./styles";
import QuantitySelector from "../../Components/QuantitySelector";
import Button from "../../Components/Button";
import ImageCarousel from "../../Components/ImageCarousel";
import { ActivityIndicator } from "react-native-web";

const ProductScreen = () => {
  const [product, setProduct] = useState(undefined);

  const [selectedOption, setSelectedOption] = useState(undefined);
  const [quantity, setQuantity] = useState(1);

  const navigation = useNavigation(); 
  const route = useRoute();

  useEffect(() => {
    if (!route.params.id) {
      return;
    }

    DataStore.query(Product, route.params.id).then(setProduct);
  }, [route.params?.id]);

  useEffect(() => {
    if (product?.options) {
      setSelectedOption(product.options[0]);
    }
  }, [product]);

  const onAddToCart = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    if (!product || !userData) {
      return;
    }

    const newCartProduct = new CartProduct({
      userSub: userData.attributes.sub,
      quantity,
      option: selectedOption,
      productID: product.id,
    });

    await DataStore.save(newCartProduct);
    navigation.navigate("shoppingCart");
  };

  if (!product) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>

      {/* Image carousel */}
      <ImageCarousel images={product.images} />

      {/* Option selector */}
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
      >
        {product.options.map((option) => (
          <Picker.Item label={option} value={option} />
        ))}
      </Picker>

      {/* Price */}
      <Text style={styles.price}> from ${product.price.toFixed(2)} </Text>

      {/* Description */}
      <Text style={styles.description}>{product.description}</Text>

      {/* Quantity selector */}

      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      {/* Button */}
      <Button
        text={"Add To Cart"}
        onPress={onAddToCart}
        containerStyles={{
          backgroundColor: "#e3c905",
        }}
      />
      <Button
        text={"Buy Now"}
        onPress={() => {
          console.warn("Buy now");
        }}
      />
    </ScrollView>
  );
};

export default ProductScreen;
