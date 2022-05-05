// import React from "react";
// import { SafeAreaView } from "react-native";
// import SafeAreaStyle from "./Components/SafeAreaStyle";

// import Router from "./Router";

// import { Amplify } from 'aws-amplify';
// import {withAuthenticator} from 'aws-amplify-react-native';

// import awsconfig from './src/aws-exports';
// Amplify.configure(awsconfig);

// export default function App() {
//   return (
//     <SafeAreaView style={SafeAreaStyle.AndroidSafeArea}>
//       <Router />
//     </SafeAreaView>
//   );
// }


import React from "react";
import { SafeAreaView } from "react-native";
import SafeAreaStyle from "./Components/SafeAreaStyle";
// import { StripeProvider } from "@stripe/stripe-react-native";

import Router from "./Router";

import { Amplify } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';

import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);



const App = () => {
  return (
    <SafeAreaView style={SafeAreaStyle.AndroidSafeArea}>
      {/* <StripeProvider publishableKey="pk_test_51Kv1LJSIV3M5SkvNXGk6PRfFEkIr9M5AEoQ9GHIsfVUq76eyZuCXrpG18RBTXp3gNGTyAokEJsgXF3l6vOqfFAqI0068hB06SZ" > */}
        <Router />
      {/* </StripeProvider> */}
    </SafeAreaView>
  );
};

export default  withAuthenticator (App);
