import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import Row from "./Row";
import Label from "./Label";
import {
  blackColor,
  borderColor,
  inputColor,
  primaryColor,
  whiteColor,
} from "@constants/Colors";
import Separator from "./Separator";
import { styleGlobal } from "src/styles";
import { Ionicons } from "@expo/vector-icons";
{
  /* <Ionicons name="eye" size={24} color="black" />; */
}
{
  /* <Ionicons name="eye-off-outline" size={24} color="black" />; */
}

type PropsType = {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
};
function PasswordInputCustom({ label, value, onChangeText }: PropsType) {
  const [isFocus, setIsFocus] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <Row direction="column" full start>
      <Label>{label}</Label>
      <Separator height={10} />
      <TextInput
        textColor={blackColor}
        secureTextEntry={!isShowPassword}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        mode="outlined"
        style={[
          styleGlobal.shadow,
          {
            backgroundColor: inputColor,
            minHeight: 50,
            fontSize: 18,
            width: "100%",
            borderRadius: 30,
          },
        ]}
        outlineStyle={[
          {
            borderRadius: 14,
            borderWidth: 1,
            padding: 10,
            borderColor: isFocus ? primaryColor : borderColor,
          },
        ]}
        label=""
        value={value}
        onChangeText={onChangeText}
        right={
          <TextInput.Icon
            onPress={() => setIsShowPassword(!isShowPassword)}
            icon={isShowPassword ? "eye" : "eye-off"}
          />
        }
      />
    </Row>
  );
}

export default PasswordInputCustom;
