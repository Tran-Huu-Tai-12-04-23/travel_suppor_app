import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ROUTE_KEY } from './route';
import { config } from '@helper/helpers';
import { LoginScreen, RegisterScreen } from 'src/screens/Auth';
import IntroScreen from 'src/screens/Auth/Intro';
const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => {
   return (
      <Navigator
         screenOptions={{
            headerShown: false,
            ...config,
         }}
      >
         <Screen name={ROUTE_KEY.INTRO} component={IntroScreen} options={{ headerTitle: '' }} />
         <Screen
            name={ROUTE_KEY.LOGIN}
            component={LoginScreen}
            options={{
               headerTitle: '',
            }}
         />
         <Screen
            name={ROUTE_KEY.REGISTER}
            component={RegisterScreen}
            options={{
               headerTitle: '',
            }}
         />
      </Navigator>
   );
};

export default AuthNavigator;
