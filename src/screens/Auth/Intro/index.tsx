import { styleGlobal } from "../../../styles";
import { View, Image, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import PagerView from "react-native-pager-view";
import { primaryColor, secondaryColor, whiteColor } from "@constants/Colors";
import Row from "@components/Row";
import { localImages } from "assets/localImage";
import TextDefault from "@components/TextDefault";
import ButtonCustom from "@components/ButtonCustom";
import { FontAwesome } from "@expo/vector-icons";
import { navigate } from "@navigation/NavigationService";
import { ROUTE_KEY } from "@navigation/route";
import MainLayout from "@layout/MainLayout";
import { deviceWidth } from "@helper/utils";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import * as Location from "expo-location";
import { Toast } from "react-native-alert-notification";
import { useUserLocation } from "@context/userLocationContext";

type PropsType = {};
function MyPager({}: PropsType) {
  const [currentPage, setCurrentPage] = useState(0);
  const slide = useRef<PagerView | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = (currentPage + 1) % 3;
      setCurrentPage(nextPage);
      slide?.current?.setPage(nextPage);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentPage]);

  const onPageSelected = (event: { nativeEvent: { position: any } }) => {
    const { position } = event.nativeEvent;
    setCurrentPage(position);
  };

  return (
    <>
      <PagerView
        ref={slide}
        style={styles.container}
        initialPage={0}
        onPageSelected={onPageSelected}
      >
        <View style={[styles.page]} key="1">
          <Animated.Image
            entering={FadeInUp.delay(200).springify()}
            source={localImages().intro1}
            style={{
              width: deviceWidth - 20,
              height: 400,
            }}
            resizeMode="contain"
          />
          <TextDefault
            entering={FadeInDown.delay(400).springify()}
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            Discover a Hotel & Resort to Book a Suitable Room
          </TextDefault>
          <TextDefault
            entering={FadeInDown.delay(600).springify()}
            style={{ textAlign: "center" }}
          >
            The hotel and resort business is one of the best and loyal business
            in the global market. We are the agency that helps to book you a
            good room in a suitable palace at a reasonable price.
          </TextDefault>
        </View>
        <View style={[styles.page]} key="2">
          <Image
            source={localImages().intro2}
            style={{
              width: deviceWidth - 20,
              height: 400,
            }}
            resizeMode="contain"
          />
          <TextDefault
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            Discover a Hotel & Resort to Book a Suitable Room
          </TextDefault>
          <TextDefault style={{ textAlign: "center" }}>
            The hotel and resort business is one of the best and loyal business
            in the global market. We are the agency that helps to book you a
            good room in a suitable palace at a reasonable price.
          </TextDefault>
        </View>
        <View style={[styles.page]} key="3">
          <Animated.Image
            entering={FadeInUp.delay(200).springify()}
            source={localImages().intro3}
            style={{
              width: deviceWidth - 20,
              height: 400,
            }}
            resizeMode="contain"
          />

          <TextDefault
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            Discover a Hotel & Resort to Book a Suitable Room
          </TextDefault>
          <TextDefault style={{ textAlign: "center" }}>
            The hotel and resort business is one of the best and loyal business
            in the global market. We are the agency that helps to book you a
            good room in a suitable palace at a reasonable price.
          </TextDefault>
        </View>
      </PagerView>
      <Row
        center
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          display: "flex",
          rowGap: 30,
        }}
        direction="column"
      >
        <ButtonCustom
          entering={FadeInDown.delay(800).springify()}
          primary
          labelStyle={{ fontWeight: "bold" }}
          minWidth={deviceWidth / 2}
          style={{ paddingHorizontal: 30, padding: 24, marginTop: 30 }}
          title="GET STARTED"
          onPress={() => navigate(ROUTE_KEY.LOGIN)}
          endIcon={<FontAwesome name="arrow-right" size={16} color="white" />}
        />

        <Row center style={{ columnGap: 10 }}>
          {[1, 2, 3].map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                slide?.current?.setPage(key - 1);
                setCurrentPage(key - 1);
              }}
            >
              <View
                style={[
                  styles.dot,
                  {
                    paddingHorizontal: key === currentPage + 1 ? 20 : 10,
                    backgroundColor:
                      key === currentPage + 1 ? primaryColor : secondaryColor,
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </Row>
      </Row>
    </>
  );
}
export default function IntroScreen() {
  const { setUserLocation } = useUserLocation();
  useEffect(() => {
    let watchId: any;
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Toast.show({
            title: "Permission to access location was denied",
          });
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: 4,
          timeInterval: 4,
          distanceInterval: 10,
        });

        if (location.coords)
          // setUserLocation({
          //    latitude: location.coords.latitude,
          //    longitude: location.coords.longitude,
          // });
          console.log(
            "=====================Current Position:",
            location.coords
          );

        watchId = Location.watchPositionAsync(
          {
            accuracy: 4,
            timeInterval: 4,
            distanceInterval: 10,
          },
          (position) => {
            if (position.coords)
              setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            console.log("========================User position changed:", {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          }
        );
      } catch (err) {
        console.warn(err);
      }
    };
    getLocation();
    return () => {
      Location.stopLocationUpdatesAsync(watchId);
    };
  }, []);

  return (
    <MainLayout>
      <TextDefault>{process.env.EXPO_PUBLIC_LINK_API}</TextDefault>
      <MyPager />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  dot: {
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 2000,
    backgroundColor: secondaryColor,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
    color: "white",
    marginBottom: 10,
  },
  swipeText: {
    fontSize: 18,
    color: "white",
    fontStyle: "italic",
  },
});
