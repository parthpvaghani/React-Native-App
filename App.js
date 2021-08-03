import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import Main from "./components/MainComponent";

import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/store/configureStore";

const store = ConfigureStore();
LogBox.ignoreLogs(["Setting a timer"]);
import { AuthProvider } from "./Auth/Auth";

export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Main />
      </Provider>
    </AuthProvider>
  );
}
