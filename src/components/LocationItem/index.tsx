import ButtonCustom from '@components/ButtonCustom';
import Icon from '@components/Icon';
import Row from '@components/Row';
import TextDefault from '@components/TextDefault';
import { blackColor, borderColor, btnPrimary, secondaryColor, whiteColor } from '@constants/Colors';
import { navigate } from '@navigation/NavigationService';
import { ROUTE_KEY } from '@navigation/route';
import { localImages } from 'assets/localImage';
import React, { useMemo, useRef } from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styleGlobal } from 'src/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useBottomSheet } from '@context/BottomSheetContext';
import { Button } from 'react-native-paper';

type PropsType = {
   width: any;
};
function LocationItem({ width = 200 }: PropsType) {
   const { openBottomSheet } = useBottomSheet();

   const _contentBottomSheet = () => {
      return (
         <Row
            full
            rowGap={10}
            direction="column"
            style={[styleGlobal.borderTop, { marginTop: 10, paddingTop: 10, paddingHorizontal: 20 }]}
         >
            <Row between full>
               <Row direction="column" start colGap={4}>
                  <TextDefault>Jimbaran, South Kuta</TextDefault>
                  <TextDefault>19.4km</TextDefault>
               </Row>
               <ButtonCustom
                  endIcon={<MaterialIcons name="directions" size={32} color={btnPrimary} />}
                  minWidth={10}
                  style={{ width: 50, padding: 4 }}
                  background={whiteColor}
                  onPress={() => {
                     // navigate(ROUTE_KEY.DIRECTION);
                  }}
                  title={''}
               />
            </Row>
            <ButtonCustom
               startIcon={<Icon link={localImages().addIcon} style={{ height: 18, width: 18 }} />}
               style={{ padding: 10, width: '100%' }}
               onPress={() => {}}
               title={'Add to schedule'}
            />
            <ButtonCustom
               startIcon={<Icon link={localImages().addIcon} style={{ height: 18, width: 18 }} />}
               style={{ padding: 10, width: '100%' }}
               onPress={() => {}}
               title={'Add to my favourite'}
            />
         </Row>
      );
   };
   const handleBottomSheet = () => {
      openBottomSheet({
         content: _contentBottomSheet(),
         title: 'Misty Rock Resort',
         snapPoints: [250],
      });
   };
   return (
      <TouchableOpacity
         onLongPress={handleBottomSheet}
         onPress={() => {
            // navigate(ROUTE_KEY.DETAIL_LOCATION);
         }}
      >
         <Row direction="column" style={[{ minHeight: 200, height: 250, width: width, padding: 4, borderRadius: 30 }]}>
            <Image
               style={[{ width: '100%', height: 200, borderRadius: 30 }]}
               source={{
                  uri: 'https://www.picmaker.com/templates/_next/image?url=https%3A%2F%2Fstatic.picmaker.com%2Fscene-prebuilts%2Fthumbnails%2FYT-0090.png&w=3840&q=75',
               }}
            />

            <Row
               between
               style={[
                  styleGlobal.shadowForce,
                  {
                     padding: 10,
                     borderRadius: 20,
                     backgroundColor: borderColor,
                     alignContent: 'center',
                     alignItems: 'center',
                     bottom: 5,
                     transform: [{ translateY: -50 }],
                  },
               ]}
            >
               <Row start direction="column">
                  <TextDefault bold style={{ fontSize: 18 }}>
                     Misty Rock Resort
                  </TextDefault>
                  <Row between full>
                     <Row direction="column" start colGap={4}>
                        <TextDefault>Jimbaran, South Kuta</TextDefault>
                        <TextDefault>19.4km</TextDefault>
                     </Row>
                     <ButtonCustom
                        endIcon={<MaterialIcons name="directions" size={32} />}
                        minWidth={10}
                        style={{ width: 50, padding: 4 }}
                        mode="text"
                        onPress={() => {
                           navigate(ROUTE_KEY.DIRECTION);
                        }}
                        title={''}
                     />
                  </Row>
               </Row>
            </Row>
         </Row>
      </TouchableOpacity>
   );
}

export default LocationItem;
