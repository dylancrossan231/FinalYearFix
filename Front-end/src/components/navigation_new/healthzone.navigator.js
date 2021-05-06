import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "./app-routes";
import HealthZone from "../HealthZone";
import WeightsHome from "../WeightsHome";
import AddWeight from "../AddWeight";


export function HealthZoneNavigator(props) {


  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      {...props}
      mode="modal"
      headerMode="none"
      screenOptions={{ animationEnabled: true }}
    >
      <Stack.Screen name={routes.HEALTHZONE_COMPONENT} component={HealthZone} />
      <Stack.Screen name={routes.WEIGHTS_HOME} component={WeightsHome} />
      <Stack.Screen name={routes.ADD_WEIGHT} component={AddWeight} />
    </Stack.Navigator>
  );
}

