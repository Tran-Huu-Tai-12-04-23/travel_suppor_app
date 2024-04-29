import * as Updates from 'expo-updates';
import Icon from '@components/Icon';
import { localImages } from 'assets/localImage';
import { blackColor } from '@constants/Colors';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useBottomSheet } from '@context/BottomSheetContext';
import Row from './Row';
import ButtonCustom from './ButtonCustom';
import { styleGlobal } from 'src/styles';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { deviceWidth } from '@helper/utils';

const _renderBottomChooseImg = () => {
   return (
      <Row rowGap={10} direction="column" full style={[styleGlobal.borderTop, { padding: 10, marginTop: 10 }]}>
         <ButtonCustom
            onPress={function (): void {}}
            title={'Choose from library'}
            full
            minWidth={deviceWidth - 40}
            startIcon={<Ionicons name="library" size={24} color="black" />}
         />
         <ButtonCustom
            minWidth={deviceWidth - 40}
            primary
            onPress={function (): void {}}
            title={'Take new picture'}
            startIcon={<FontAwesome name="camera" size={24} color="white" />}
         />
      </Row>
   );
};
function FindLocationButton() {
   const { openBottomSheet } = useBottomSheet();

   const handleOpen = () => {
      openBottomSheet({
         content: _renderBottomChooseImg(),
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
               backgroundColor: blackColor,
               borderRadius: 1000,
               // flex: 1,
               transform: [{ translateY: -25 }],
            }}
            onPress={handleOpen}
         >
            <Icon link={localImages().searchIconActive} style={{ marginTop: 25 / 2 }} />
         </TouchableOpacity>
      </Animated.View>
   );
}

export default FindLocationButton;
