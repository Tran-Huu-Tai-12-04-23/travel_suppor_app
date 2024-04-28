import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ROUTE_KEY } from './route';
import { config } from '@helper/helpers';
import { Platform } from 'react-native';
import HomeScreen from 'src/screens/BottomTab/Home';
import { Image } from 'react-native';
import { localImages } from 'assets/localImage';
import LocationScreen from 'src/screens/BottomTab/Schedule';
import Row from '@components/Row';
import NotificationScreen from 'src/screens/BottomTab/Notification';
import PersonalScreen from 'src/screens/BottomTab/Personal';
import { _SCREENS } from './_screen';
import DetailScreen from './MainNavigator';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabNavigator = () => {
   return (
      <Navigator
         screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
               position: 'absolute',
               backgroundColor: 'white',
               height: Platform.OS == 'android' ? 80 : 100,
               borderTopRightRadius: 40,
               borderTopLeftRadius: 40,
            },
            headerShown: false,
            ...config,
         }}
      >
         {_SCREENS.map((screen) => (
            <Screen
               key={screen.route}
               name={screen.route}
               component={screen.component}
               options={{
                  tabBarShowLabel: false,
                  tabBarIcon: ({ focused }) => (
                     <Row center direction="column">
                        <Image
                           source={focused ? screen.iconActive : screen.icon}
                           style={{ width: 24, height: 24 }}
                           resizeMode="contain"
                        />
                     </Row>
                  ),
               }}
            />
         ))}

         {/* <DetailScreen /> */}
      </Navigator>
   );
};

export default BottomTabNavigator;
