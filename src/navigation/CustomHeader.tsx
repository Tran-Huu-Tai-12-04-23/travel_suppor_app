import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { localImages } from "assets/localImage";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { goBack } from "./NavigationService";
import {
  blackColor,
  mainBg,
  primaryColor,
  whiteColor,
} from "@constants/Colors";
import { styleGlobal } from "src/styles";
import Icon from "@components/Icon";
import ButtonCustom from "@components/ButtonCustom";
import { SafeAreaView } from "react-native";

type PropsType = {
  title?: string;
  isBack?: boolean;
  style?: any;
};
function CustomHeader({ title, style, isBack = true }: PropsType) {
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 10,
        minHeight: 50,
        top: 10,
        position: "absolute",
        zIndex: 1000,
        ...style,
      }}
    >
      <Row
        start
        style={{
          alignContent: "center",
          alignItems: "center",
        }}
        full
      >
        {isBack && (
          <TouchableOpacity
            onPress={goBack}
            style={[
              styleGlobal.shadowForce,
              styleGlobal.center,
              {
                borderRadius: 100,
                flex: 5,
                backgroundColor: whiteColor,
                height: 40,
                width: 40,
                padding: 20,
              },
            ]}
          >
            <Icon
              link={localImages().arrBackIcon}
              style={{ width: 14, height: 14 }}
            />
          </TouchableOpacity>
        )}
        <TextDefault
          style={[
            styleGlobal.shadow,
            {
              width: "50%",
              flex: 5,
              fontSize: 20,
              textAlign: "left",
              fontWeight: "bold",
            },
          ]}
        >
          {title}
        </TextDefault>
      </Row>
    </SafeAreaView>
  );
}

export default CustomHeader;
