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

type PropsType = {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  flex?: number;
  disabled?: boolean;
  placeholder?: string;
};
function TextInputCustom({
  label,
  placeholder,
  value,
  onChangeText,
  flex,
  disabled,
}: PropsType) {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Row direction="column" full start style={{ flex: flex }}>
      {label && (
        <>
          <Label>{label}</Label>
          <Separator height={10} />
        </>
      )}
      <TextInput
        disabled={disabled}
        textColor={blackColor}
        placeholder={placeholder}
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
            color: blackColor,
          },
        ]}
        outlineStyle={[
          {
            borderRadius: 14,
            borderWidth: 1,
            padding: 8,
            borderColor: isFocus ? primaryColor : borderColor,
          },
        ]}
        placeholderTextColor={"gray"}
        label=""
        value={value}
        onChangeText={onChangeText}
      />
    </Row>
  );
}

export default TextInputCustom;
