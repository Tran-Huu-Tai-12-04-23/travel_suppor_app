import React from 'react';
import ImgBackgroundLayout from '@layout/ImgBackgroundLayout';
import CustomHeader from '@navigation/CustomHeader';
import Container from '@components/Container';
import Row from '@components/Row';
import Title from '@components/Title';
import Separator from '@components/Separator';
import TextInputCustom from '@components/TextInputCustom';
import PasswordInputCustom from '@components/PasswordInputCustom';
import { styleGlobal } from 'src/styles';
import { ScrollView, View } from 'react-native';
import ButtonCustom from '@components/ButtonCustom';
import TextDefault from '@components/TextDefault';
import { btnPrimary, primaryColor } from '@constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { localImages } from 'assets/localImage';
import { useAuth } from '@context/authContext';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { navigate } from '@navigation/NavigationService';
import { ROUTE_KEY } from '@navigation/route';

export default function RegisterScreen() {
   const { login } = useAuth();
   return (
      <ImgBackgroundLayout>
         <ScrollView
            contentContainerStyle={[
               styleGlobal.scrollContainer,
               {
                  alignContent: 'center',
               },
            ]}
         >
            <CustomHeader title="" />

            <Container>
               <Row style={{ marginTop: 'auto', marginBottom: 'auto' }} start direction="column" rowGap={20}>
                  <Title style={{ fontSize: 40 }}>Register</Title>
                  <Animated.View style={{ width: '100%' }} entering={FadeInDown.delay(100).springify()}>
                     <TextInputCustom label="Username" />
                  </Animated.View>
                  <Animated.View style={{ width: '100%' }} entering={FadeInDown.delay(200).springify()}>
                     <PasswordInputCustom label="Password" />
                  </Animated.View>
                  <Animated.View style={{ width: '100%' }} entering={FadeInDown.delay(200).springify()}>
                     <PasswordInputCustom label="Confirm Password" />
                  </Animated.View>
                  <Row full center>
                     <Animated.View entering={FadeInDown.delay(200).springify()}>
                        <ButtonCustom
                           bold
                           mode="contained"
                           full
                           style={{ padding: 14, width: 200 }}
                           primary
                           title="REGISTER"
                           onPress={function (): void {
                              login({ username: 'HUUTAI' });
                           }}
                        />
                     </Animated.View>
                  </Row>
                  <Row center full colGap={10}>
                     <TextDefault style={[styleGlobal.label]}>You already an account?</TextDefault>
                     <TouchableOpacity onPress={() => navigate(ROUTE_KEY.LOGIN)}>
                        <TextDefault bold style={{ color: primaryColor }}>
                           Sign In
                        </TextDefault>
                     </TouchableOpacity>
                  </Row>
                  <Separator height={20} />
               </Row>
            </Container>
         </ScrollView>
      </ImgBackgroundLayout>
   );
}
