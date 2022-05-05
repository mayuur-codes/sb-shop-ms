import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import countryList from "country-list";
import { DataStore, Auth } from "aws-amplify";
import { Order, OrderProduct, CartProduct } from "../../src/models";

import Button from "../../Components/Button";
import styles from "./styles";

const countries = countryList.getData();

const AddressScreen = () => {
  const [country, setCountry] = useState(countries[0].code);
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(" ");

  const [city, setCity] = useState("");

  const navigation = useNavigation();

  const saveOrder = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    const newOrder = await DataStore.save(
      new Order({
        userSub: userData.attributes.sub,
        fullname: fullname,
        phoneNumber: phone,
        country,
        city,
        address,
      })
    );

    const cartItems = await DataStore.query(CartProduct, (cp) =>
      cp.userSub("eq", userData.attributes.sub)
    );

    await Promise.all(
      cartItems.map((cartItem) =>
        DataStore.save(
          new OrderProduct({
            quantity: cartItem.quantity,
            option: cartItem.option,
            productID: cartItem.productID,
            orderID: newOrder.id,
          })
        )
      )
    );

    await Promise.all(cartItems.map((cartItem) => DataStore.delete(cartItem)));
 
 
    navigation.navigate("home"); 
    
  };



  const onCheckout = () => {
    if (!!addressError) {
      Alert.alert("Please fill in all the fields");
      return;
    }

    if (!fullname) {
      Alert.alert("Please enter your fullname");
      return;
    }

    if (!phone || phone.length < 10) {
      Alert.alert("Please enter your phone number");
      return;
    }

    saveOrder();
  };

  const validateAddress = () => {
    if (address.length < 3) {
      setAddressError("Invalid address");
      return false;
    }
    setAddressError("");
    return true;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "android" ? 10 : 0}
      style={styles.root}
    >
      <ScrollView style={styles.root}>
        <View style={styles.row}>
          <Picker selectedValue={country} onValueChange={setCountry}>
            {countries.map((country) => (
              <Picker.Item value={country.code} label={country.name} />
            ))}
          </Picker>
        </View>
        {/* full name */}
        <View style={styles.row}>
          <Text style={styles.label}>Full name (First and Last name)</Text>
          <TextInput
            style={styles.input}
            placeholder="Full name"
            value={fullname}
            onChangeText={setFullname}
          />
        </View>

        {/* phone number */}
        <View style={styles.row}>
          <Text style={styles.label}>Enter your Mobile number</Text>
          <TextInput
            style={styles.input}
            placeholder="Mobile number"
            value={phone}
            onChangeText={setPhone}
            keyboardType={"phone - pad"}
          />
        </View>

        {/* address */}
        <View style={styles.row}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onEndEditing={validateAddress}
            onChangeText={(text) => {
              setAddress(text);
              setAddressError("");
            }}
          />
          {!!addressError && (
            <Text style={styles.errorLabel}>{addressError}</Text>
          )}
        </View>

        {/* city  */}
        <View style={styles.row}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
        </View>

        <Button text="Checkout" onPress={onCheckout} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddressScreen;
