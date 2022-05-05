import { SafeAreaView } from "react-native";
import React from "react";
import {Auth} from 'aws-amplify';
import Button from "../../Components/Button";
const MenuScreen = () => {
  const onLogout = () => {
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  };
  return (
    <SafeAreaView>
      <Button text="Sign out" onPress={onLogout} />
    </SafeAreaView>
  );
};

export default MenuScreen;
