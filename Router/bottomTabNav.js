import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/Homescreen";
import MenuScreen from "../Screens/MenuScreen";
import Entypo from "react-native-vector-icons/Entypo";
import HomeStack from "./HomeStack";
import ShoppingCartStack from "./ShoppingCartStack";

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#2b91ff",
      tabBarInactiveTintColor: "#0971e0",
      tabBarShowLabel: false,

     
      
      // tabBarOptions={{
      //   showLabel: false,
      //   inactiveTintColor: "#2b91ff",
      //   activeTintColor: "#0971e0",
        
      }}
    >
      <Tab.Screen
        component={HomeStack}
        name="home" 
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={HomeScreen}
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="user" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={ShoppingCartStack}
        name="shoppingCart"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="shopping-cart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={MenuScreen}
        name="More"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="menu" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
