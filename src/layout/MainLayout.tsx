import { mainBg, whiteColor } from "@constants/Colors";
import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { styleGlobal } from "src/styles";

type PropsType = {
  onTouchStart?: () => void;
  children: React.ReactNode;
  style?: any;
};
function MainLayout({ children, onTouchStart, style }: PropsType) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: whiteColor, marginTop: 30 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust this offset if needed
    >
      <View
        onTouchStart={onTouchStart}
        style={[
          styleGlobal.container,
          { backgroundColor: whiteColor, ...style },
        ]}
      >
        {children}
      </View>
    </KeyboardAvoidingView>
  );
}

export default MainLayout;
