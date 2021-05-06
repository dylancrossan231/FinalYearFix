/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import reducers from "./src/reducers";
import * as Font from "expo-font";// import NavigationController from './navigation/NavigationController';
import thunk from "redux-thunk";
import { Root } from "native-base";

// import { createBrowserHistory } from "history"; 
// import { connectRouter } from "connected-react-router";


/**
 * Navigation dependencies & modules
 */
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./src/components/navigation_new/auth.navigator";


import { useFonts, Roboto_500Medium } from "@expo-google-fonts/roboto";

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
// const store = createStore(reducers, applyMiddleware(thunk));

export default class App extends Component {
  state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),

      // Any string can be used as the fontFamily name. Here we use an object to provide more control

    });
    this.setState({ fontsLoaded: true });
  }
  async componentDidMount() {
    this.loadFonts();

  }
  render() {
    return (
      <Root>
        <Provider store={store}>
          <NavigationContainer>
            <AuthNavigator />
          </NavigationContainer>
        </Provider>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
