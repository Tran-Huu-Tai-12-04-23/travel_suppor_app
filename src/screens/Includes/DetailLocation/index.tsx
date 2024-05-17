import Row from "@components/Row";
import SlideImage from "@components/SlideImage";
import TextDefault from "@components/TextDefault";
import {
  blackColor,
  btnPrimary,
  hightLightColor,
  mainBg,
  whiteColor,
} from "@constants/Colors";
import MainLayout from "@layout/MainLayout";
import CustomHeader from "@navigation/CustomHeader";
import React, { useState } from "react";
import { FlatList, Modal, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ImageViewer from "react-native-image-zoom-viewer";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { styleGlobal } from "src/styles";
import ButtonCustom from "@components/ButtonCustom";
import Separator from "@components/Separator";
import Icon from "@components/Icon";
import { localImages } from "assets/localImage";
import { navigate } from "@navigation/NavigationService";
import { ROUTE_KEY } from "@navigation/route";
import MapView, { Marker } from "react-native-maps";
import { infoArea } from "../_mock";
import { useRoute } from "@react-navigation/native";
import NotFoundIdentity from "src/webroot/NotFoundIdentity";
import { ILocation } from "src/Models/location.model";
import { deviceHeight } from "@helper/utils";
import useFindDetailLocation from "@hooks/api/location/useFindDetailLocation";
import LoadingScreen from "src/webroot/LoadingScreen";
import LocationItem from "@components/LocationItem";
import HorizontalSkeleton from "@components/HorizontalSkeleton";

function DetailLocationScreen() {
  const [isExpand, setIsExpand] = useState(false);
  const [isViewerImg, setIsViewerImg] = useState(false);
  const { params } = useRoute();
  const { _id, distanceIF } = params as {
    _id: string;
    distanceIF: {
      distanceInKilometers: number;
      distanceInMeters: number;
    };
  };
  if (!_id) {
    return <NotFoundIdentity title="Location ID not found!" />;
  }
  const { data, isLoading } = useFindDetailLocation({ locationId: _id });
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (!data) {
    return <NotFoundIdentity title="Location not found!" />;
  }

  const {
    coordinates,
    lstImgs = [],
    name,
    address,
    description,
  } = data.currentLocation;

  const [longitude, latitude] = coordinates?.coordinates ?? [-1, -1];

  const infoMap = infoArea(latitude, longitude);

  const _renderNearbyLocation = ({ item }: { item: ILocation }) => (
    <LocationItem data={item} key={item._id} width={250} />
  );

  return (
    <MainLayout
      style={{
        padding: 0,
        minHeight: deviceHeight,
        flex: 1,
        backgroundColor: whiteColor,
      }}
    >
      <CustomHeader title={""} />
      <ScrollView style={{ flex: 1 }}>
        <Row style={{ height: 300 }} full>
          <SlideImage
            images={lstImgs}
            onPressImage={() => setIsViewerImg(true)}
          />
        </Row>

        <Modal visible={isViewerImg}>
          <AntDesign
            style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}
            onPress={() => setIsViewerImg(false)}
            name="closecircleo"
            size={24}
            color="white"
          />
          <ImageViewer
            imageUrls={lstImgs.map((img) => {
              return { url: img };
            })}
          />
        </Modal>

        <Row
          style={{
            minHeight: "80%",
            backgroundColor: whiteColor,
            transform: [{ translateY: -100 }],
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingHorizontal: 20,
            paddingVertical: 14,
          }}
          full
          start
          direction="column"
        >
          <TextDefault style={styleGlobal.textHeader}>{name}</TextDefault>
          <TextDefault bold>{address}</TextDefault>
          <TextDefault style={{ color: hightLightColor }}>
            {distanceIF?.distanceInKilometers} kms from you.
          </TextDefault>
          <TextDefault>
            {description?.substring(
              0,
              isExpand ? description.toString().length : 100
            )}
          </TextDefault>
          <TouchableOpacity onPress={() => setIsExpand(!isExpand)}>
            <TextDefault
              bold
              style={{
                color: btnPrimary,
                fontSize: 18,
                textDecorationLine: "underline",
              }}
            >
              {isExpand ? "Less" : "More"}
            </TextDefault>
          </TouchableOpacity>
          <Separator height={20} />
          <Row start colGap={20}>
            <ButtonCustom
              style={{ padding: 5 }}
              primary
              onPress={() => {}}
              title={"Review"}
            />
          </Row>
          <Separator height={20} />

          <View
            style={{
              width: "100%",
              height: 200,
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <MapView
              initialRegion={{
                latitude: infoMap.LATITUDE,
                longitude: infoMap.LONGITUDE,
                latitudeDelta: infoMap.LATITUDE_DELTA,
                longitudeDelta: infoMap.LONGITUDE_DELTA,
              }}
              style={{ width: "100%", height: 200, borderRadius: 20 }}
            >
              <Marker
                coordinate={{
                  latitude: infoMap.LATITUDE,
                  longitude: infoMap.LONGITUDE,
                }}
                title="You location"
                description="Origin Point"
                pinColor={blackColor}
                icon={localImages().originIcon}
              />
            </MapView>
          </View>

          <Separator height={30} />
          <TextDefault bold>Nearby Locations</TextDefault>
          <Separator height={20} />
          <View style={{ height: 200 }}>
            {!isLoading && data?.nearLocations && (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{ flex: 1 }}
                ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
                data={data?.nearLocations}
                renderItem={_renderNearbyLocation}
                keyExtractor={(item) => item._id}
              />
            )}
            {isLoading && <HorizontalSkeleton />}
          </View>

          <Separator height={10} />
        </Row>
      </ScrollView>
      <Row
        full
        center
        colGap={20}
        style={[
          styleGlobal.shadowForce,
          { padding: 14, backgroundColor: mainBg },
        ]}
      >
        <ButtonCustom
          onPress={() => {}}
          title={""}
          startIcon={
            <Icon
              link={localImages().saveLocationIcon}
              style={{
                width: 20,
                height: 20,
              }}
            />
          }
          style={{ padding: 10, width: 100 }}
          textColor={btnPrimary}
          background={whiteColor}
        />
        <ButtonCustom
          primary
          onPress={() =>
            navigate(ROUTE_KEY.DIRECTION, {
              desLocation: [longitude, latitude],
            })
          }
          title={"Director"}
          full
          style={{ width: 200, padding: 10 }}
          endIcon={
            <MaterialIcons name="directions" size={20} color={whiteColor} />
          }
        />
      </Row>
    </MainLayout>
  );
}

export default DetailLocationScreen;
