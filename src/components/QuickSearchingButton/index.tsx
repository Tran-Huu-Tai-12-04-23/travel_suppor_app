import { btnPrimary } from "@constants/Colors";
import Animated, { FadeInDown } from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useBottomSheet } from "@context/BottomSheetContext";
import Row from "../Row";
import ButtonCustom from "../ButtonCustom";
import { styleGlobal } from "src/styles";
import { FontAwesome } from "@expo/vector-icons";
import { deviceWidth } from "@helper/utils";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useUserLocation } from "@context/userLocationContext";
import usePredictImage from "@hooks/api/feature/usePredictImage";
import {
  ALERT_TYPE,
  AlertNotificationDialog,
  AlertNotificationToast,
} from "react-native-alert-notification";
import { uploadImageAsync } from "src/config/firebaseWeb";
import { useModal } from "@context/ModalContext";
import GifImage from "@components/Gif";
import { GIF_LINK } from "assets/Gif";
import LocationView from "@components/LocationView";
import { navigate } from "@navigation/NavigationService";
import { ROUTE_KEY } from "@navigation/route";
import FoodView from "@components/FoodView";

const _renderBottomChooseImg = (
  onPressTakePicture: () => void,
  onPressCamera: () => void
) => {
  return (
    <Row
      rowGap={10}
      direction="column"
      full
      style={[styleGlobal.borderTop, { padding: 10, marginTop: 10 }]}
    >
      <ButtonCustom
        onPress={onPressTakePicture}
        title={"Choose from library"}
        full
        minWidth={deviceWidth - 40}
        startIcon={<Ionicons name="library" size={24} color="black" />}
      />
      <ButtonCustom
        minWidth={deviceWidth - 40}
        primary
        onPress={onPressCamera}
        title={"Take new picture"}
        startIcon={<FontAwesome name="camera" size={24} color="white" />}
      />
    </Row>
  );
};

function QuickSearchingButton() {
  const { openModal, hideModal } = useModal();
  const { data, error, isLoading, onPredict } = usePredictImage();
  const { userLocation } = useUserLocation();
  const { openBottomSheet, hideBottomSheet } = useBottomSheet();

  const onPressTakePicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== ImagePicker.PermissionStatus.GRANTED) {
      AlertNotificationToast.show({
        title: "Library access permission denied",
        type: ALERT_TYPE.DANGER,
      });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (result.canceled) {
      return;
    }
    const asset = result.assets[0];
    if (!asset) return;
    try {
      hideBottomSheet();
      openModal({
        content: (
          <Row style={{ padding: 20 }} center>
            <GifImage source={GIF_LINK.FIND_LOCATION} />
          </Row>
        ),
        title:
          "Application predicting this image that you provided! waiting ...",
        nameAcceptButton: "Ok",
        nameCancelButton: "Cancel",
        onReject: () => {
          hideModal();
        },
        onAccept: async () => {
          hideModal();
        },
      });
      const image_url = await uploadImageAsync(asset.uri);
      if (userLocation)
        onPredict({
          image_url,
          location: [userLocation?.longitude, userLocation?.latitude],
        });
      else onPredict({ image_url });
    } catch (error) {
      console.log(error);
    }
  };
  const onPressCamera = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== ImagePicker.PermissionStatus.GRANTED) {
      AlertNotificationDialog.show({
        title: "Camera permission denied. ",
        type: ALERT_TYPE.DANGER,
      });
      return;
    }

    // Launch camera and capture image
    const result = await ImagePicker.launchCameraAsync({ base64: true });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];
    if (!asset) {
      return;
    }

    try {
      hideBottomSheet();
      openModal({
        content: (
          <Row style={{ padding: 20 }} center>
            <GifImage source={GIF_LINK.FIND_LOCATION} />
          </Row>
        ),
        title:
          "Application predicting this image that you provided! waiting ...",
        nameAcceptButton: "Ok",
        nameCancelButton: "Cancel",
        onReject: () => {
          hideModal();
        },
        onAccept: async () => {
          hideModal();
        },
      });
      const image_url = await uploadImageAsync(asset.uri);
      if (userLocation)
        onPredict({
          image_url,
          location: [userLocation?.longitude, userLocation?.latitude],
        });
      else onPredict({ image_url });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    openBottomSheet({
      content: _renderBottomChooseImg(onPressTakePicture, onPressCamera),
      title: "Search for img!",
      snapPoints: [180],
    });
  };

  useEffect(() => {
    if (!isLoading && data)
      openModal({
        content: (
          <Animated.View entering={FadeInDown.damping(200).springify()}>
            {data?.food ? (
              <TouchableOpacity
                onPress={() => {
                  navigate(ROUTE_KEY.DETAIL_FOOD, {
                    _id: data?.food?._id,
                    distanceIF: data?.food?.distanceInfo,
                  });
                  hideModal();
                }}
              >
                <FoodView data={data?.food} />
              </TouchableOpacity>
            ) : data?.location ? (
              <TouchableOpacity
                onPress={() => {
                  navigate(ROUTE_KEY.DETAIL_LOCATION, {
                    _id: data?.location?._id,
                    distanceIF: data?.location?.distanceInfo,
                  });
                  hideModal();
                }}
              >
                <LocationView data={data?.location} />
              </TouchableOpacity>
            ) : null}
          </Animated.View>
        ),
        title: "Predicting done!",
        nameAcceptButton: "Ok",
        nameCancelButton: "Cancel",
        onReject: () => {
          hideModal();
        },
        onAccept: async () => {
          hideModal();
        },
      });
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      hideBottomSheet();
    }
  }, [error]);
  return (
    <Animated.View entering={FadeInDown.delay(400).springify()}>
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          backgroundColor: btnPrimary,
          borderRadius: 1000,
          // flex: 1,
          transform: [{ translateY: -25 }],
        }}
        onPress={handleOpen}
      >
        <Ionicons
          name="search-sharp"
          size={30}
          color="white"
          style={{ marginTop: "auto", marginBottom: "auto" }}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

export default QuickSearchingButton;
