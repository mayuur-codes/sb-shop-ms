// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { DataStore, Auth } from "aws-amplify";

// import { Product, CartProduct } from "../../src/models";
// import CartProductItem from "../../Components/CartProductItem";
// import Button from "../../Components/Button";

// // import products from "../../data/cart";

// export default function ShoppingCartScreen() {
//   const [cartProducts, setCartProducts] = useState([]);

//   const navigation = useNavigation();

//   const fetchCartProducts = async () => {
//     const userData = await Auth.currentAuthenticatedUser();

//     DataStore.query(CartProduct, (cp) =>
//       cp.userSub("eq", userData.attributes.sub)
//     ).then(setCartProducts);
//   };

//   useEffect(() => {
//     fetchCartProducts();
//   }, []);

//   useEffect(() => {
//     if (cartProducts.filter((cp) => !cp.product).length === 0) {
//       return;
//     }

//     const fetchProducts = async () => {
//       // query all products that are in the cart
//       const products = await Promise.all(
//         cartProducts.map((cartProduct) =>
//           DataStore.query(Product, cartProduct.productID)
//         )
//       );

//       // assign the products to the cart items
//       setCartProducts((currentCartProducts) =>
//         currentCartProducts.map((cartProduct) => ({
//           ...cartProduct,
//           product: products.find((p) => p.id === cartProduct.productID),
//         }))
//       );
//     };

//     fetchProducts();
//   }, [cartProducts]);

//   useEffect(() => {
//     const subcription = DataStore.observe(CartProduct).subscribe(msg => fetchCartProducts());
//     return subcription.unsubscribe;
//   }, []);


//   useEffect(() => {
//     const subcriptions = cartProducts.map((cp) =>
//       DataStore.observe(CartProduct, cp.id).subscribe((msg) => {
//         if (msg.opType === "UPDATE") {
//           setCartProducts((curCartProducts) =>
//             curCartProducts.map((cp) => {
//               if (cp.id !== msg.element.id) {
//                 return cp;
//               }

//               return {
//                 ...cp,
//                 ...msg.element,
//               };
//             })
//           );
//         }
//       })
//     );

//     return () => {
//       subcriptions.forEach((sub) => sub.unsubscribe());
//     };
//   }, [cartProducts]);

//   const onCheckout = () => {
//     navigation.navigate("Address", { totalPrice });
//   };

//   if (cartProducts.filter((cp) => !cp.product).length !== 0) {
//     return <ActivityIndicator />;
//   }

//   const totalPrice = cartProducts.reduce(
//     (summedPrice, product) =>
//       summedPrice + (product?.product?.price || 0) * product.quantity,
//     0
//   );

//   return (
//     <View style={styles.page}>
//       {/* render product component */}
//       <FlatList
//         data={cartProducts}
//         renderItem={({ item }) => <CartProductItem cartItem={item} />}
//         showsVerticalScrollIndicator={false}
//         ListHeaderComponent={() => (
//           <View>
//             <Text style={{ fontSize: 18 }}>
//               Subtotal ({cartProducts.length} items): {""}
//               <Text style={{ color: "#e47911", fontWeight: "bold" }}>
//                 ${totalPrice.toFixed(2)}
//               </Text>
//             </Text>
//             <Button
//               text={"Procced to checkout"}
//               onPress={onCheckout}
//               containerStyles={{
//                 backgroundColor: "#f7e300",
//                 borderColor: "#c7b702",
//               }}
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   page: {
//     padding: 10,
//     margin: 3,
//   },
// });

// // import React from 'react'
// // import { View, Text, StyleSheet, FlatList } from 'react-native'
// // import FontAweSome from 'react-native-vector-icons/FontAwesome'
// // import ProductItem from '../../Components/ProductItem'
// // import products from '../../data/cart'

// // export default function HomeScreen() {
// //     return (
// //         <View style={styles.page}>
// //             {/* {products.map(product => (
// //                 <ProductItem key={product.id} product={product} />
// //             ))} */}
// //         <FlatList
// //         data={products}
// //         renderItem={({ item }) => <ProductItem product={item} />}
// //         showsVerticalScrollIndicator={false}
// //         />
// //         </View>
// //     )
// // }

// // const styles = StyleSheet.create({
// //     page: {
// //         padding: 10,
// //         margin: 3,
// //     },

// // })
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DataStore, Auth } from "aws-amplify";

import { Product, CartProduct } from "../../src/models/index";
import CartProductItem from "../../Components/CartProductItem";
import Button from "../../Components/Button";

// import products from '../../data/cart';

const ShopingCartScreen = () => {
  console.log("cart screen", CartProduct)
  const [cartProducts, setCartProducts] = useState([]);

  const navigation = useNavigation();

  const fetchCartProducts = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    // TODO query only my cart items
    DataStore.query(CartProduct, cp =>
      cp.userSub('eq', userData.attributes.sub),
    ).then(setCartProducts);
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  useEffect(() => {
    if (cartProducts.filter(cp => !cp.product).length === 0) {
      return;
    }

    const fetchProducts = async () => {
      // query all products that are used in cart
      const products = await Promise.all(
        cartProducts.map(cartProduct =>
          DataStore.query(Product, cartProduct.productID),
        ),
      );

      // assign the products to the cart items
      setCartProducts(currentCartProducts =>
        currentCartProducts.map(cartProduct => ({
          ...cartProduct,
          product: products.find(p => p.id === cartProduct.productID),
        })),
      );
    };

    fetchProducts();
  }, [cartProducts]);

  useEffect(() => {
    const subscription = DataStore.observe(CartProduct).subscribe(msg =>
      fetchCartProducts(),
    );
    return subscription.unsubscribe;
  }, []);

  useEffect(() => {
    const subscriptions = cartProducts.map(cp =>
      DataStore.observe(CartProduct, cp.id).subscribe(msg => {
        if (msg.opType === 'UPDATE') {
          setCartProducts(curCartProducts =>
            curCartProducts.map(cp => {
              if (cp.id !== msg.element.id) {
                console.log('differnt id');
                return cp;
              }
              return {
                ...cp,
                ...msg.element,
              };
            }),
          );
        }
      }),
    );

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [cartProducts]);

  const totalPrice = cartProducts.reduce(
    (summedPrice, product) =>
      summedPrice + (product?.product?.price || 0) * product.quantity,
    0,
  );

  const onCheckout = () => {
    navigation.navigate('Address', {totalPrice});
  };

  if (cartProducts.filter(cp => !cp.product).length !== 0) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{padding: 10}}>
      {/* Render Product Componet */}
      <FlatList
        data={cartProducts}
        renderItem={({item}) => <CartProductItem cartItem={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Text style={{fontSize: 18}}>
              Subtotal ({cartProducts.length} items):{' '}
              <Text style={{color: '#e47911', fontWeight: 'bold'}}>
                ${totalPrice.toFixed(2)}
              </Text>
            </Text>
            <Button
              text="Proceed to checkout"
              onPress={onCheckout}
              containerStyles={{
                backgroundColor: '#f7e300',
                borderColor: '#c7b702',
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ShopingCartScreen;