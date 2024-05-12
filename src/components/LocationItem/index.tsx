import ButtonCustom from '@components/ButtonCustom';
import Icon from '@components/Icon';
import Row from '@components/Row';
import TextDefault from '@components/TextDefault';
import { blackColor, borderColor, btnPrimary, hightLightColor, secondaryColor, whiteColor } from '@constants/Colors';
import { navigate } from '@navigation/NavigationService';
import { ROUTE_KEY } from '@navigation/route';
import { localImages } from 'assets/localImage';
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styleGlobal } from 'src/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useBottomSheet } from '@context/BottomSheetContext';
import { ILocation } from 'src/Models/location.model';
import ImageCustom from '@components/ImageCustom';

type PropsType = {
   width: any;
   data: ILocation;
};
function LocationItem({ width = 250, data }: PropsType) {
   const { name, distanceInfo, lstImgs, address } = data;
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
                  <TextDefault>{name}</TextDefault>
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
         title: name,
         snapPoints: [250],
      });
   };
   const thumbnails = useCallback(() => {
      return lstImgs && lstImgs.length > 0
         ? lstImgs[0]
         : 'https://www.androidauthority.com/wp-content/uploads/2015/07/location_marker_gps_shutterstock.jpg';
   }, [lstImgs]);

   return (
      <Row direction="column" style={[{ width: width, height: 170, borderRadius: 30 }]}>
         <TouchableOpacity
            onPress={() => {
               navigate(ROUTE_KEY.DETAIL_LOCATION, { _id: data._id, distanceIF: distanceInfo });
            }}
         >
            <ImageCustom link={thumbnails()} style={{ borderRadius: 10, height: 120 }} />
         </TouchableOpacity>
         <Row
            style={{
               backgroundColor: borderColor,
               padding: 10,
               transform: [{ translateY: -25 }],
               borderBottomEndRadius: 10,
               borderBottomStartRadius: 10,
            }}
         >
            <Row start full direction="column" style={{ overflow: 'hidden' }}>
               <TextDefault
                  bold
                  style={{ fontSize: 18, width: '70%', overflow: 'hidden' }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
               >
                  {name}
               </TextDefault>
               <Row direction="column" start colGap={4}>
                  <TextDefault numberOfLines={1} ellipsizeMode="tail">
                     {address}
                  </TextDefault>
                  <Row colGap={20}>
                     <TextDefault bold>{distanceInfo && distanceInfo.distanceKiloMetres?.text}</TextDefault>
                     <TextDefault style={{ color: hightLightColor }} bold>
                        {distanceInfo && distanceInfo.estimateTime?.text}
                     </TextDefault>
                  </Row>
               </Row>
            </Row>
         </Row>
      </Row>
   );
}

export default memo(LocationItem);
