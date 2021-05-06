import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { routes } from './app-routes';
import AddWorkout from '../AddWorkout';
import WorkoutsHome from '../WorkoutsHome';




export function MainNavigator(props) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      {...props}
      mode="modal"
      headerMode="none"
      screenOptions={{ animationEnabled: true }}
    >
      <Stack.Screen name={routes.HOME_WORKOUT} component={WorkoutsHome} />
      <Stack.Screen
        name={routes.ADD_WORKOUT}
        component={AddWorkout}
      />
    </Stack.Navigator>
  );
}

