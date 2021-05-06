import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {routes} from './app-routes';
import CompanyList from '../CompanyList';
import WorkoutsHome from '../WorkoutsHome';
import {MainNavigator} from './main.navigator';
import ExercisesHome from '../ExercisesHome';
import { HealthZoneNavigator } from "./healthzone.navigator";



export function AuthTabNavigator(props) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{ animationEnabled: true, unmountOnBlur: true }}
      {...props}
    >
      <Tab.Screen name={routes.MAIN} component={MainNavigator} />
      <Tab.Screen
        name={routes.EXERCISEHOME}
        component={ExercisesHome}
        unmountOnBlur={true}
      />
      <Tab.Screen name={routes.HEALTH_ZONE} component={HealthZoneNavigator} />
    </Tab.Navigator>
  );
}