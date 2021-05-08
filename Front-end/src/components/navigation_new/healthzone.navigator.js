import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "./app-routes";
import HealthZone from "../HealthZone/HealthZone";
import WeightsHome from "../HealthZone/HealthZoneComponents/Weights/WeightsHome";
import AddWeight from "../HealthZone/HealthZoneComponents/Weights/AddWeight";
import UpdateWeight from "../HealthZone/HealthZoneComponents/Weights/UpdateWeight";


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
      <Stack.Screen
        name={routes.WEIGHTS_HOME}
        component={WeightsHome}
        unmountOnBlur={true}
      />
      <Stack.Screen name={routes.ADD_WEIGHT} component={AddWeight} />
      <Stack.Screen name={routes.UPDATE_WEIGHT} component={UpdateWeight} />
    </Stack.Navigator>
  );
}

