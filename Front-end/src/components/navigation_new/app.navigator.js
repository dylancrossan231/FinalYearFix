import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './auth.navigator';
import { AppRoute } from './app-routes';
import {MainNavigator} from './main.navigator';


const Stack = createStackNavigator();

export const AppNavigator = (props) => (
  <Stack.Navigator
    {...props}
    mode="modal"
    headerMode="none"
    screenOptions={{ animationEnabled: true }}
  >
    <Stack.Screen
      navigation={this.props.navigation}
      name={AppRoute.AUTH}
      component={AuthNavigator}
    />
    
  </Stack.Navigator>
);





  // AuthNavigator
    // Login 
    // Register
    // Main Navigator (only if logged in)