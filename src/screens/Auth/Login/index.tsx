import React, { useEffect } from 'react';
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
import { GoogleSignin } from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';

export default function LoginScreen() {
   const { login } = useAuth();
   async function onGoogleButtonPress() {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
   }
   useEffect(() => {
      GoogleSignin.configure({
         scopes: ['email'],
         webClientId: '292164408635-5es9m2v2q3lcaie0frj4nj3qg9tll04i.apps.googleusercontent.com',
         offlineAccess: true,
      });
   }, []);

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
                  <Title style={{ fontSize: 40 }}>Login</Title>
                  <Animated.View style={{ width: '100%' }} entering={FadeInDown.delay(100).springify()}>
                     <TextInputCustom label="Username" />
                  </Animated.View>
                  <Animated.View style={{ width: '100%' }} entering={FadeInDown.delay(200).springify()}>
                     <PasswordInputCustom label="Password" />
                  </Animated.View>
                  <Row center full>
                     <TouchableOpacity>
                        <TextDefault style={{ color: btnPrimary, textAlign: 'center' }}>Forgot password?</TextDefault>
                     </TouchableOpacity>
                  </Row>
                  <Row full center>
                     <Animated.View entering={FadeInDown.delay(200).springify()}>
                        <ButtonCustom
                           bold
                           mode="contained"
                           full
                           style={{ padding: 14, width: 200 }}
                           primary
                           title="LOGIN"
                           onPress={function (): void {
                              login({ username: 'HUUTAI' });
                           }}
                        />
                     </Animated.View>
                  </Row>
                  <Row center full colGap={10}>
                     <TextDefault style={[styleGlobal.label]}>ADon’t have an account?</TextDefault>
                     <TouchableOpacity onPress={() => navigate(ROUTE_KEY.REGISTER)}>
                        <TextDefault bold style={{ color: primaryColor }}>
                           Sign Up
                        </TextDefault>
                     </TouchableOpacity>
                  </Row>
                  <Separator height={20} />
                  <Animated.View style={{ width: '100%' }} entering={FadeInDown.delay(300).springify()}>
                     <Row center full colGap={10}>
                        <View style={{ width: '30%', height: 1, backgroundColor: '#B3B3B3' }}></View>
                        <TextDefault bold style={styleGlobal.label}>
                           Sign In With
                        </TextDefault>
                        <View style={{ width: '30%', height: 1, backgroundColor: '#B3B3B3' }}></View>
                     </Row>
                  </Animated.View>

                  <Separator height={20} />
                  <Row between colGap={30} full>
                     <Animated.View style={{ width: '45%' }} entering={FadeInDown.delay(400).springify()}>
                        <ButtonCustom
                           minWidth={'45%'}
                           shadow
                           primary={false}
                           onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                           title={'Google'}
                           style={{ padding: 10 }}
                           mode="contained"
                           bold
                           startIcon={
                              <Image
                                 source={localImages().googleIcon}
                                 style={{ width: 24, height: 24 }}
                                 resizeMode="contain"
                              />
                           }
                        />
                     </Animated.View>
                     <Animated.View style={{ width: '45%' }} entering={FadeInDown.delay(400).springify()}>
                        <ButtonCustom
                           minWidth={'45%'}
                           shadow
                           primary={false}
                           onPress={() => {}}
                           title={'Github'}
                           style={{ padding: 10 }}
                           mode="contained"
                           bold
                           startIcon={
                              <Image
                                 source={localImages().githubIcon}
                                 style={{ width: 30, height: 30 }}
                                 resizeMode="contain"
                              />
                           }
                        />
                     </Animated.View>
                  </Row>
               </Row>
            </Container>
         </ScrollView>
      </ImgBackgroundLayout>
   );
}
