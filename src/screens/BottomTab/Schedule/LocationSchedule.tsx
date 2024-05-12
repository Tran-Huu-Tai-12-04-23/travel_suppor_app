import GifImage from '@components/Gif';
import Row from '@components/Row';
import { borderColor, whiteColor } from '@constants/Colors';
import { useModal } from '@context/ModalContext';
import { useUserLocation } from '@context/userLocationContext';
import useSuggestLocationSchedule from '@hooks/api/feature/useSuggestLocationSchedule';
import { GIF_LINK } from 'assets/Gif';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styleGlobal } from 'src/styles';
import LocationScheduleItem from './LocationScheduleItem';
import TextDefault from '@components/TextDefault';
import Separator from '@components/Separator';
import ButtonCustom from '@components/ButtonCustom';
import { ScrollView } from 'react-native-gesture-handler';
import { deviceHeight } from '@helper/utils';
import FloatingBtn from '@components/FloatingBtn';
import { localImages } from 'assets/localImage';
import Icon from '@components/Icon';

function LocationSchedule() {
   const { userLocation } = useUserLocation();
   const { openModal, hideModal } = useModal();
   const { data, isLoading, onSuggestLocationSchedule } = useSuggestLocationSchedule();

   const [isLoadingModal, setIsLoadingModal] = useState(false);
   const handleSuggestSchedule = () => {
      setIsLoadingModal(true);
      userLocation && onSuggestLocationSchedule({ location: [userLocation?.longitude, userLocation?.latitude] });
      // openModal();
      openModal({
         content: (
            <Row style={{ padding: 20 }} center>
               <GifImage source={GIF_LINK.FIND_LOCATION} />
            </Row>
         ),
         title: 'Wait...',
         nameAcceptButton: 'Ok',
         nameCancelButton: 'Cancel',
         onReject: () => {
            hideModal();
         },
         onAccept: async () => {
            hideModal();
         },
      });
   };

   useEffect(() => {
      if (!isLoading && data) {
         setIsLoadingModal(false);
         hideModal();
      }
   }, [data]);

   if (!data || isLoadingModal)
      return (
         <Row direction="column" full style={{ padding: 20, flex: 1, backgroundColor: whiteColor }} center>
            <GifImage source={GIF_LINK.FIND_SCHEDULE} />
            <TextDefault bold style={{ textAlign: 'center', fontSize: 22 }}>
               You don't have location schedule to travel
            </TextDefault>

            <Separator height={20} />
            <ButtonCustom primary onPress={handleSuggestSchedule} title={'Create your schedule'} />
            <Separator height={20} />
            <TextDefault>We will suggest schedule for you base your location. Keep your phone...</TextDefault>
         </Row>
      );

   return (
      <>
         <ScrollView style={{ flex: 1 }}>
            <Row
               direction="column"
               style={{
                  padding: 10,
                  backgroundColor: whiteColor,
                  flex: 1,
                  minHeight: deviceHeight,
                  paddingTop: 20,
                  position: 'relative',
               }}
               rowGap={10}
               full
            >
               {data?.scheduleLocations?.schedule &&
                  data?.scheduleLocations?.schedule?.map((location, index) => (
                     <Row key={index} start between full colGap={20} style={{ position: 'relative' }}>
                        <View style={[styleGlobal.point]} />
                        <LocationScheduleItem data={location} />
                        <View
                           style={{
                              height: index < data?.scheduleLocations?.schedule.length - 1 ? 240 : 0,
                              width: 5,
                              position: 'absolute',
                              backgroundColor: borderColor,
                              borderStyle: 'dashed',
                              left: 6,
                              top: 16,
                              borderRadius: 10,
                           }}
                        />
                     </Row>
                  ))}
               <Separator height={20} />

               <ButtonCustom
                  primary
                  style={{ paddingHorizontal: 30 }}
                  onPress={handleSuggestSchedule}
                  title={'Re-Find Schedule '}
                  endIcon={<Icon link={localImages().suggestIcon} />}
               />

               <Separator height={100} />
            </Row>
         </ScrollView>
      </>
   );
}

export default LocationSchedule;
