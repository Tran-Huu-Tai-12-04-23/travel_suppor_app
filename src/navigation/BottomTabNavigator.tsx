import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Image, View } from "react-native";
import HomeDrawer from "src/Drawer/HomeDrawer";
import ScheduleScreen from "src/screens/BottomTab/Schedule";
import TextToSpeakScreen from "src/screens/BottomTab/SpeechToText";
import PersonalScreen from "src/screens/BottomTab/Personal";
import { ROUTE_KEY } from "./route";
import { localImages } from "assets/localImage";
import { styleGlobal } from "src/styles";
import Animated, { FadeInDown } from "react-native-reanimated";
import Row from "@components/Row";
import { config } from "@helper/helpers";
import QuickSearchingButton from "@components/QuickSearchingButton";
import { mainBg } from "@constants/Colors";

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <Row
      style={[
        styleGlobal.shadowForce,
        { flexDirection: "row", height: 60, backgroundColor: mainBg },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let icon;

        if (route.name === ROUTE_KEY.MAIN_APP) {
          icon = isFocused
            ? localImages().homeActiveIcon
            : localImages().homeIcon;
        } else if (route.name === ROUTE_KEY.SCHEDULE) {
          icon = isFocused
            ? localImages().scheduleActiveIcon
            : localImages().scheduleIcon;
        } else if (route.name === ROUTE_KEY.TEXT_TO_SPEAK) {
          icon = isFocused
            ? localImages().micActiveIcon
            : localImages().micIcon;
        } else if (route.name === ROUTE_KEY.PERSONAL) {
          icon = isFocused
            ? localImages().userActiveIcon
            : localImages().userIcon;
        } else return <QuickSearchingButton key={route.name} />;

        return (
          <Animated.View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            entering={FadeInDown.delay(200).springify()}
            key={route.name}
          >
            <TouchableOpacity onPress={() => navigation.navigate(route.name)}>
              <Image
                source={icon}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Animated.View>
        );
      })}
      {/* Custom Button */}
    </Row>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        ...config,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name={ROUTE_KEY.MAIN_APP} component={HomeDrawer} />
      <Tab.Screen name={ROUTE_KEY.SCHEDULE} component={ScheduleScreen} />
      <Tab.Screen name={"any"} component={ScheduleScreen} />
      <Tab.Screen
        name={ROUTE_KEY.TEXT_TO_SPEAK}
        component={TextToSpeakScreen}
      />
      <Tab.Screen name={ROUTE_KEY.PERSONAL} component={PersonalScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
