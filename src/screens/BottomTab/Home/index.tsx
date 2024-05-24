import Avatar from "@components/Avatar";
import ButtonCustom from "@components/ButtonCustom";
import FoodItem from "@components/FoodItem";
import LocationItem from "@components/LocationItem";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { blackColor, inputColor, labelColor } from "@constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import useLoadHomeData from "@hooks/api/home/useLoadHomeData";
import MainLayout from "@layout/MainLayout";
import { navigate, openDrawer } from "@navigation/NavigationService";
import { ROUTE_KEY } from "@navigation/route";
import { localImages } from "assets/localImage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  RefreshControl,
  View,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IFood } from "src/Models/food.model";
import { ILocation } from "src/Models/location.model";
import { styleGlobal } from "src/styles";
import * as Location from "expo-location";
import { Toast } from "react-native-alert-notification";
import { useUserLocation } from "@context/userLocationContext";
import { FadeIn } from "react-native-reanimated";
import HorizontalSkeleton from "@components/HorizontalSkeleton";
import { useAuth } from "@context/authContext";

const districts = [
  {
    key: 1,
    name: "District 1",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmi3BslW2sqMbOe_KrwB-p5uOM1mcp9vssGg2exoJR8g&s",
  },
  {
    key: 2,
    name: "District 2",
    img: "https://nasaland.vn/wp-content/uploads/2022/09/Quan-2-1.jpg",
  },
  {
    key: 3,
    name: "District 3",
    img: "https://cdnmedia.baotintuc.vn/Upload/of1YDQmgYWjUVVEP2wPLg/files/2019/10/Quan3/a12.jpg",
  },
  {
    key: 4,
    name: "District 4",
    img: "https://statics.vinpearl.com/quan-4-co-gi-choi-1_1630224675.jpg",
  },
  {
    key: 5,
    name: "District 5",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLRloQ4f-tPIspfn4egOkgIxazxTDFzJQYota3FPPN6Q&s",
  },
  {
    key: 6,
    name: "District 6",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4DgDR9h4aVMVPEql6pCfSBjZ5IBm3KV7dmIhvnX4iEA&s",
  },
  {
    key: 7,
    name: "District 7",
    img: "https://image.sggp.org.vn/w1000/Uploaded/2024/aopovun/2023_11_23/mot-goc-quan-7-ve-dem-6945.jpg.webp",
  },
];

function HomeScreen() {
  const { logout } = useAuth();
  const { setUserLocation } = useUserLocation();
  const { data, isLoading, onLoadHomeData } = useLoadHomeData();
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const { userLocation } = useUserLocation();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    userLocation &&
      onLoadHomeData({
        location: [userLocation?.longitude, userLocation?.latitude],
      });
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        console.log("=====================Current Position:", location.coords);

        watchId = Location.watchPositionAsync(
          {
            accuracy: 4,
            timeInterval: 4,
            distanceInterval: 10,
          },
          (position) => {
            if (position.coords)
              // setUserLocation({
              //    latitude: position.coords.latitude,
              //    longitude: position.coords.longitude,
              // });
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

  useEffect(() => {
    userLocation &&
      onLoadHomeData({
        location: [userLocation?.longitude, userLocation?.latitude],
      });
  }, [userLocation]);

  const _renderItem = ({ item, index }: { item: ILocation; index: number }) => (
    <LocationItem key={index} width={250} data={item} />
  );
  const _renderFoodItem = ({ item, index }: { item: IFood; index: number }) => (
    <FoodItem key={index} width={250} data={item} />
  );

  const _renderSkeleton = () => {
    return <HorizontalSkeleton />;
  };

  return (
    <MainLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Row
          between
          full
          colGap={20}
          style={{ alignItems: "flex-start", paddingTop: 10 }}
        >
          <Row start colGap={20}>
            <TouchableOpacity onPress={openDrawer}>
              <Avatar
                link={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTWcCiaYRwLtYTSP7wf3wgPCo-ExPN2OZtFu16Hbx8Qg&s",
                }}
              />
            </TouchableOpacity>
            <TextDefault style={{ marginTop: "auto" }}>
              Hello,
              <TextDefault bold style={{ fontSize: 22 }}>
                Niara!
              </TextDefault>
            </TextDefault>
          </Row>

          <TouchableOpacity onPress={logout}>
            <Row style={styleGlobal.shadow}>
              <Image
                source={localImages().exitIcon}
                style={{ width: 35, height: 35 }}
                resizeMode="contain"
              />
            </Row>
          </TouchableOpacity>
        </Row>
        <Separator height={30} />
        <TextDefault style={[styleGlobal.textHeader, { color: blackColor }]}>
          Find Your Stay
        </TextDefault>
        <Separator height={30} />
        <TouchableOpacity onPress={() => navigate(ROUTE_KEY.SEARCH)}>
          <Row
            between
            wrap
            colGap={10}
            style={{
              backgroundColor: inputColor,
              borderRadius: 10,
              paddingLeft: 10,
            }}
          >
            <TextDefault style={{ color: labelColor }}>
              Where do you go?
            </TextDefault>
            <ButtonCustom
              minWidth={50}
              radius={10}
              primary
              style={{ padding: 16 }}
              startIcon={
                <Ionicons
                  name="search-sharp"
                  size={22}
                  color="white"
                  style={{ marginTop: "auto", marginBottom: "auto" }}
                />
              }
              onPress={() => {
                if (!searchQuery) return;
                setSearchQuery("");
              }}
              title={""}
            />
          </Row>
        </TouchableOpacity>
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Row start colGap={30}>
            {districts.map((dis, index) => (
              <Row direction="column" rowGap={4} center key={index}>
                <Avatar size={70} link={{ uri: dis.img }} />
                <TextDefault bold>{dis.name}</TextDefault>
              </Row>
            ))}
          </Row>
        </ScrollView> */}
        <Separator height={30} />
        <Row between full>
          <TextDefault
            entering={FadeIn.springify()}
            bold
            style={{ fontSize: 22 }}
          >
            Famous places near you
          </TextDefault>
        </Row>
        <View style={{ minHeight: 170 }}>
          {isLoading && _renderSkeleton()}
          {!isLoading && (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
              contentContainerStyle={{ paddingBottom: 20 }}
              data={data?.locations}
              renderItem={_renderItem}
              keyExtractor={(item) => item?._id}
            />
          )}
        </View>
        <Separator height={30} />
        <Row between full>
          <TextDefault
            entering={FadeIn.springify()}
            bold
            style={{ fontSize: 22 }}
          >
            Famous foods near you
          </TextDefault>
        </Row>
        <View style={{ minHeight: 170 }}>
          {isLoading && _renderSkeleton()}
          {!isLoading && (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              ListEmptyComponent={_renderSkeleton}
              ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
              contentContainerStyle={{ paddingBottom: 20 }}
              data={data?.foods}
              renderItem={_renderFoodItem}
              keyExtractor={(item) => item?._id}
            />
          )}
        </View>

        <Separator height={100} />
      </ScrollView>
    </MainLayout>
  );
}

export default HomeScreen;
