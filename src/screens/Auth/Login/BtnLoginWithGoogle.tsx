import ButtonCustom from '@components/ButtonCustom';
import Row from '@components/Row';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Image } from 'react-native';
import React, { useEffect } from 'react';
import { localImages } from 'assets/localImage';

// import login with google
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import { deviceWidth } from '@helper/utils';
import { authFirebase } from 'src/config/firebaseWeb';
import { IUser } from 'src/Models/user.model';
import { useAuth } from '@context/authContext';

WebBrowser.maybeCompleteAuthSession();
function BtnLoginWithGoogle() {
   const { login } = useAuth();
   const [request, response, promptAsync] = Google.useAuthRequest({
      iosClientId: '160269674777-v6tbcapbjm94b38geel3oqjv93nobkgu.apps.googleusercontent.com',
      androidClientId: '160269674777-vgip01g5m7rpiho6k96scv8se2uuf43t.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
   });

   const handleAuthStateChange = async (user: any) => {
      if (user) {
         const userLogin: IUser = {
            uid: user.uid,
            username: user.email ?? '',
            email: user.email ?? '',
            displayName: user.displayName ?? '',
            photoURL: user.photoURL ?? '',
            createAt: user.createdAt ? new Date(parseInt(user.createdAt)) : null,
            lastLoginAt: user.lastLoginAt ? new Date(parseInt(user.lastLoginAt)) : undefined,
         };

         login(userLogin, true);
      }
   };

   useEffect(() => {
      if (response?.type === 'success') {
         const { id_token } = response.params;
         const credential = GoogleAuthProvider.credential(id_token);
         signInWithCredential(authFirebase, credential);
      }
   }, [response]);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(authFirebase, handleAuthStateChange);

      return () => {
         unsubscribe(); // Unsubscribe from the auth state listener on component unmount
      };
   }, []);

   return (
      <Row between colGap={30} full>
         <Animated.View style={{ width: deviceWidth - 40 }} entering={FadeInDown.delay(400).springify()}>
            <ButtonCustom
               minWidth={'45%'}
               shadow
               primary={false}
               title={'Google'}
               style={{ padding: 10 }}
               mode="contained"
               bold
               startIcon={
                  <Image source={localImages().googleIcon} style={{ width: 24, height: 24 }} resizeMode="contain" />
               }
               onPress={promptAsync}
            />
         </Animated.View>
      </Row>
   );
}

export default BtnLoginWithGoogle;
