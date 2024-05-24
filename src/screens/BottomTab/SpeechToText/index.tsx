import ButtonCustom from "@components/ButtonCustom";
import GifImage from "@components/Gif";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { deviceHeight } from "@helper/utils";
import { useVoiceRecognition } from "@hooks/voice";
import MainLayout from "@layout/MainLayout";
import { GIF_LINK } from "assets/Gif";
import { localImages } from "assets/localImage";
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import {
  dangerColor,
  labelColor,
  mainBg,
  primaryColor,
  secondaryColor,
} from "@constants/Colors";
function TextToSpeakScreen() {
  const { startRecognizing, stopRecognizing, state } = useVoiceRecognition();

  console.log(state.results[0]);
  return (
    <MainLayout>
      <Row
        direction="column"
        full
        style={{ height: deviceHeight - 100, padding: 10 }}
        rowGap={20}
      >
        <Row
          style={{ padding: 20, backgroundColor: mainBg, borderRadius: 20 }}
          full
        >
          <TextDefault style={{ fontSize: 32 }}>{state.results[0]}</TextDefault>
        </Row>
        <TextDefault bold style={{ fontSize: 22 }}>
          Translate to vietnamese:
        </TextDefault>
        <Row
          style={{ padding: 20, backgroundColor: mainBg, borderRadius: 20 }}
          full
        >
          <TextDefault style={{ fontSize: 32 }}>{state.results[0]}</TextDefault>
        </Row>
        <TouchableOpacity
          onPress={() => {
            if (state.isRecording) {
              stopRecognizing();
            } else {
              startRecognizing();
            }
          }}
          style={{
            backgroundColor: mainBg,
            padding: 20,
            borderRadius: 200,
          }}
        >
          <MaterialIcons
            name="keyboard-voice"
            size={200}
            color={state.isRecording ? dangerColor : primaryColor}
          />
        </TouchableOpacity>

        {state.isRecording && (
          <GifImage source={GIF_LINK.RECORDING} width={150} height={150} />
        )}
      </Row>
    </MainLayout>
  );
}

export default TextToSpeakScreen;
