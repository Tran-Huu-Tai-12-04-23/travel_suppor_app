import { btnPrimary } from '@constants/Colors';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { PermissionsAndroid, Platform, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useBottomSheet } from '@context/BottomSheetContext';
import Row from './Row';
import ButtonCustom from './ButtonCustom';
import { styleGlobal } from 'src/styles';
import { FontAwesome } from '@expo/vector-icons';
import { deviceWidth } from '@helper/utils';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const _renderBottomChooseImg = (onPressTakePicture: () => void, onPressCamera: () => void) => {
   return (
      <Row rowGap={10} direction="column" full style={[styleGlobal.borderTop, { padding: 10, marginTop: 10 }]}>
         <ButtonCustom
            onPress={() => {}}
            title={'Choose from library'}
            full
            minWidth={deviceWidth - 40}
            startIcon={<Ionicons name="library" size={24} color="black" />}
         />
         <ButtonCustom
            minWidth={deviceWidth - 40}
            primary
            onPress={async () => {}}
            title={'Take new picture'}
            startIcon={<FontAwesome name="camera" size={24} color="white" />}
         />
      </Row>
   );
};
function QuickSearchingButton() {
   const { openBottomSheet } = useBottomSheet();

   const onPressTakePicture = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== ImagePicker.PermissionStatus.GRANTED) {
         return;
      }
      const result = await ImagePicker.launchImageLibraryAsync();
      if (result.canceled) {
         return;
      }
      const asset = result.assets[0];
      if (asset != null) {
         console.log('RESULT : ==============> ' + asset.uri);
      }
   };
   const onPressCamera = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== ImagePicker.PermissionStatus.GRANTED) {
         return;
      }
      const result = await ImagePicker.launchCameraAsync();
      if (result.canceled) {
         return;
      }
      const asset = result.assets[0];
      if (asset != null) {
         console.log('RESULT : ==============> ' + asset.uri);
      }
   };

   const handleOpen = () => {
      openBottomSheet({
         content: _renderBottomChooseImg(onPressTakePicture, onPressCamera),
         title: 'Search for img location!',
         snapPoints: [180],
      });
   };

   return (
      <Animated.View entering={FadeInDown.delay(400).springify()}>
         <TouchableOpacity
            style={{
               width: 60,
               height: 60,
               alignContent: 'center',
               alignItems: 'center',
               alignSelf: 'center',
               backgroundColor: btnPrimary,
               borderRadius: 1000,
               // flex: 1,
               transform: [{ translateY: -25 }],
            }}
            onPress={handleOpen}
         >
            <Ionicons name="search-sharp" size={30} color="white" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
         </TouchableOpacity>
      </Animated.View>
   );
}

export default QuickSearchingButton;
