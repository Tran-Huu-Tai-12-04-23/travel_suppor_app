import React from 'react';
import { DrawerContent, DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { _SCREENS_DRAWER } from './_screen_drawer';
import { ROUTE_KEY } from '@navigation/route';
import TextDefault from '@components/TextDefault';
import Row from '@components/Row';
import Avatar from '@components/Avatar';
import { Image, TouchableOpacity } from 'react-native';
import { deviceHeight } from '@helper/utils';
import ButtonCustom from '@components/ButtonCustom';
import { useAuth } from '@context/authContext';
import { btnPrimary, whiteColor } from '@constants/Colors';
import Separator from '@components/Separator';
import { localImages } from 'assets/localImage';
import { styleGlobal } from 'src/styles';

const Drawer = createDrawerNavigator();

const _renderDrawerContent = (props: any) => {
   const { logout } = useAuth();
   const { routeNames, index } = props.state;
   const focused = routeNames[index] === props.route?.name;
   return (
      <DrawerContentScrollView>
         <Row between full style={{ padding: 20, paddingBottom: 0 }}>
            <Row start>
               <TouchableOpacity>
                  <Avatar
                     link={{
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTWcCiaYRwLtYTSP7wf3wgPCo-ExPN2OZtFu16Hbx8Qg&s',
                     }}
                  />
               </TouchableOpacity>

               <TextDefault style={{ marginTop: 'auto' }}>
                  Hello,
                  <TextDefault bold style={{ fontSize: 22 }}>
                     Niara!
                  </TextDefault>
               </TextDefault>
            </Row>

            <TouchableOpacity onPress={logout}>
               <Row style={styleGlobal.shadow}>
                  <Image source={localImages().exitIcon} style={{ width: 35, height: 35 }} resizeMode="contain" />
               </Row>
            </TouchableOpacity>
         </Row>
         <DrawerContent {...props} />
      </DrawerContentScrollView>
   );
};

const HomeDrawer = () => {
   return (
      <Drawer.Navigator
         screenOptions={{
            sceneContainerStyle: {
               paddingTop: 0,
            },
            headerShown: false,
            drawerActiveTintColor: btnPrimary,
         }}
         initialRouteName={ROUTE_KEY.HOME}
         drawerContent={_renderDrawerContent}
      >
         {_SCREENS_DRAWER.map((screen) => (
            <Drawer.Screen
               name={screen.route}
               key={screen.route}
               component={screen.component}
               options={{
                  drawerLabel: screen.name,
                  drawerIcon: ({ focused }) => (
                     <Image
                        source={focused ? screen.iconActive : screen.icon}
                        style={{ width: 24, height: 24 }}
                        resizeMode="contain"
                     />
                  ),
               }}
            />
         ))}
      </Drawer.Navigator>
   );
};

export default HomeDrawer;
