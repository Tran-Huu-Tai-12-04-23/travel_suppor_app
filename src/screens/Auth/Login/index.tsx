import React, {  useState } from "react";
import ImgBackgroundLayout from "@layout/ImgBackgroundLayout";
import CustomHeader from "@navigation/CustomHeader";
import Container from "@components/Container";
import Row from "@components/Row";
import Title from "@components/Title";
import Separator from "@components/Separator";
import TextInputCustom from "@components/TextInputCustom";
import PasswordInputCustom from "@components/PasswordInputCustom";
import { styleGlobal } from "src/styles";
import { ScrollView, View } from "react-native";
import ButtonCustom from "@components/ButtonCustom";
import TextDefault from "@components/TextDefault";
import { btnPrimary, primaryColor } from "@constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeInDown } from "react-native-reanimated";
import { navigate } from "@navigation/NavigationService";
import { ROUTE_KEY } from "@navigation/route";
import BtnLoginWithGoogle from "./BtnLoginWithGoogle";
import useLogin from "@hooks/api/auth/useLogin";
import { useLoading } from "@context/loadingGlobalContext";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
export default function LoginScreen() {
  const { startLoading, stopLoading } = useLoading();
  const { isLoading, data, onLogin } = useLogin();
  const [input, setInput] = useState({
    username: "huutai123",
    password: "huutai",
  });

  const handleChangeInput = (key: string, value: string) => {
    setInput((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleLogin = () => {
    if (!input.username || !input.password) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Error",
        textBody: "Please provided full information!",
      });
      return;
    }
    onLogin(input);
  };

  return (
    <ImgBackgroundLayout>
      <ScrollView
        contentContainerStyle={[
          styleGlobal.scrollContainer,
          {
            alignContent: "center",
          },
        ]}
      >
        <CustomHeader title="" />

        <Separator height={20} />
        <Container>
          <Row
            style={{ marginTop: "auto", marginBottom: "auto" }}
            start
            direction="column"
            rowGap={20}
          >
            <Title style={{ fontSize: 40 }}>Login</Title>
            <Animated.View
              style={{ width: "100%" }}
              entering={FadeInDown.delay(100).springify()}
            >
              <TextInputCustom
                value={input.username}
                onChangeText={(text) => handleChangeInput("username", text)}
                label="Username"
              />
            </Animated.View>
            <Animated.View
              style={{ width: "100%" }}
              entering={FadeInDown.delay(200).springify()}
            >
              <PasswordInputCustom
                value={input.password}
                onChangeText={(text) => handleChangeInput("password", text)}
                label="Password"
              />
            </Animated.View>
            <Row center full>
              <TouchableOpacity>
                <TextDefault style={{ color: btnPrimary, textAlign: "center" }}>
                  Forgot password?
                </TextDefault>
              </TouchableOpacity>
            </Row>
            <Row full center>
              <Animated.View entering={FadeInDown.delay(200).springify()}>
                <ButtonCustom
                  isLoading={isLoading}
                  bold
                  mode="contained"
                  full
                  style={{ padding: 14, width: 200 }}
                  primary
                  title="LOGIN"
                  onPress={handleLogin}
                />
              </Animated.View>
            </Row>
            <Row center full colGap={10}>
              <TextDefault style={[styleGlobal.label]}>
                ADon’t have an account?
              </TextDefault>
              <TouchableOpacity onPress={() => navigate(ROUTE_KEY.REGISTER)}>
                <TextDefault bold style={{ color: primaryColor }}>
                  Sign Up
                </TextDefault>
              </TouchableOpacity>
            </Row>
            <Separator height={20} />
            <Animated.View
              style={{ width: "100%" }}
              entering={FadeInDown.delay(300).springify()}
            >
              <Row center full colGap={10}>
                <View
                  style={{
                    width: "30%",
                    height: 1,
                    backgroundColor: "#B3B3B3",
                  }}
                ></View>
                <TextDefault bold style={styleGlobal.label}>
                  Sign In With
                </TextDefault>
                <View
                  style={{
                    width: "30%",
                    height: 1,
                    backgroundColor: "#B3B3B3",
                  }}
                ></View>
              </Row>
            </Animated.View>

            <Separator height={20} />
            <BtnLoginWithGoogle />
          </Row>
        </Container>
      </ScrollView>
    </ImgBackgroundLayout>
  );
}
