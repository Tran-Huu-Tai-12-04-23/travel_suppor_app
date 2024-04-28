import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ROUTE_KEY } from './route';
import BottomTabNavigator from './BottomTabNavigator';
import DetailLocationScreen from 'src/screens/Includes/DetailLocation';
import { _DETAIL_SCREENS } from './_screen';

const Stack = createStackNavigator();

const RootStackNavigation = () => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name={ROUTE_KEY.BOTTOM_TAB} component={BottomTabNavigator} />
         {_DETAIL_SCREENS.map((screen) => (
            <Stack.Screen
               key={screen.route}
               name={screen.route}
               component={screen.component}
               options={{ headerTitle: '' }}
            />
         ))}
      </Stack.Navigator>
   );
};
export default RootStackNavigation;
