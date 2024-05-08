import { borderColor, btnPrimary, whiteColor } from '@constants/Colors';
import { deviceWidth, widthPercentageToDP } from '@helper/utils';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { ReactNode, useState } from 'react';
import { StyleSheet } from 'react-native';

type PropsType = {
   tabs: [ReactNode, ReactNode];
   names: [string, string];
};
const Tabbar = createMaterialTopTabNavigator();
const TabComponent = ({ tabs, names }: PropsType) => {
   const [focusedTab, setFocusedTab] = useState(1);
   return (
      <Tabbar.Navigator
         screenOptions={{
            tabBarStyle: {
               borderRadius: 9999,
               justifyContent: 'center',
               width: deviceWidth - 20,
               padding: 5,
               borderWidth: 1,
               borderColor: '#F2EAEA',
            },
            tabBarIndicatorStyle: {
               top: 6,
               height: 47,
               left: 6,
               width: widthPercentageToDP('100%') / 2 - 30,
               borderRadius: 9999,
               backgroundColor: btnPrimary,
               ...styles.shadown,
            },
            tabBarActiveTintColor: whiteColor, // Màu của tab khi được chọn
            tabBarInactiveTintColor: btnPrimary, // Màu của tab khi không được chọn
            tabBarPressOpacity: 0,
            tabBarPressColor: whiteColor,
            lazy: true,
         }}
      >
         <Tabbar.Screen
            listeners={{
               focus: () => {
                  setFocusedTab(0); // Cập nhật state khi tab này được focus
               },
            }}
            options={{
               tabBarContentContainerStyle: {
                  borderRadius: 99999,
               },
               tabBarLabelStyle: {
                  fontWeight: '600',
                  textTransform: 'capitalize',
                  fontSize: 14,
               },
            }}
            name={names[0]}
            children={() => tabs[0]}
         />
         <Tabbar.Screen
            listeners={{
               focus: () => {
                  setFocusedTab(1); // Cập nhật state khi tab này được focus
               },
            }}
            options={{
               tabBarContentContainerStyle: {
                  borderRadius: 99999,
               },
               tabBarLabelStyle: {
                  fontWeight: '600',
                  textTransform: 'capitalize',
                  fontSize: 14,
               },
            }}
            name={names[1]}
            children={() => tabs[1]}
         />
      </Tabbar.Navigator>
   );
};

export default TabComponent;

const styles = StyleSheet.create({
   tab: {
      borderRadius: 99999,
      backgroundColor: btnPrimary,
      width: deviceWidth / 2.16,
   },
   label: {
      color: whiteColor,
      fontWeight: '600',
      fontSize: 14,
      textAlign: 'center',
      textTransform: 'capitalize',
   },
   wrapperTab: {
      backgroundColor: whiteColor,
      borderWidth: 1,
      borderColor: borderColor,
      borderRadius: 99999,
      padding: 5,
   },
   shadown: {
      shadowOffset: {
         width: 0,
         height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
   },
});
