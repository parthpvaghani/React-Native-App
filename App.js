import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View ,LogBox} from "react-native";
import Main from "./components/MainComponent";

import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/store/configureStore";

const store = ConfigureStore();
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
