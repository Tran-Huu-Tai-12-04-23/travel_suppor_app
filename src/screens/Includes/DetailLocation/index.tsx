import Row from '@components/Row';
import SlideImage from '@components/SlideImage';
import TextDefault from '@components/TextDefault';
import { blackColor, btnPrimary, whiteColor } from '@constants/Colors';
import MainLayout from '@layout/MainLayout';
import CustomHeader from '@navigation/CustomHeader';
import React, { useRef, useState } from 'react';
import { FlatList, Modal, SafeAreaView, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { styleGlobal } from 'src/styles';
import ButtonCustom from '@components/ButtonCustom';
import Separator from '@components/Separator';
import LocationItem from '@components/LocationItem';
import Icon from '@components/Icon';
import { localImages } from 'assets/localImage';
import { navigate } from '@navigation/NavigationService';
import { ROUTE_KEY } from '@navigation/route';
import MapView, { Marker } from 'react-native-maps';
import { infoArea } from '../_mock';

function DetailLocationScreen() {
   const infoMap = infoArea(10.7326452, 106.697189);
   const mapViewRef = useRef<MapView>(null);

   const [isViewerImg, setIsViewerImg] = useState(false);
   const [images, setImages] = useState([
      'https://source.unsplash.com/1024x768/?nature',
      'https://source.unsplash.com/1024x768/?water',
      'https://www.picmaker.com/templates/_next/image?url=https%3A%2F%2Fstatic.picmaker.com%2Fscene-prebuilts%2Fthumbnails%2FYT-0090.png&w=3840&q=75',
      'https://source.unsplash.com/1024x768/?tree',
   ]);

   const _renderItem = ({ item }: { item: any }) => <LocationItem width={300} />;

   return (
      <MainLayout style={{ padding: 0 }}>
         <CustomHeader title={''} />
         <ScrollView style={{ flex: 1 }}>
            <Row style={{ height: 400 }} full>
               <SlideImage images={images} onPressImage={() => setIsViewerImg(true)} />
            </Row>

            <Modal visible={isViewerImg}>
               <AntDesign
                  style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}
                  onPress={() => setIsViewerImg(false)}
                  name="closecircleo"
                  size={24}
                  color="white"
               />
               <ImageViewer
                  imageUrls={images.map((img) => {
                     return { url: img };
                  })}
               />
            </Modal>

            <Row
               style={{
                  minHeight: '80%',
                  backgroundColor: whiteColor,
                  transform: [{ translateY: -100 }],
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  paddingHorizontal: 20,
                  paddingVertical: 14,
               }}
               full
               start
               direction="column"
            >
               <TextDefault style={styleGlobal.textHeader}>Misty Rock Resort</TextDefault>
               <Separator height={20} />
               <Row start colGap={20}>
                  <ButtonCustom style={{ padding: 5 }} primary onPress={() => {}} title={'Review'} />
               </Row>
               <Separator height={20} />
               <TextDefault>
                  Ea non tempor et laborum proident laborum aliquip tempor aliquip excepteur aliqua culpa in eu. Dolore
                  commodo eu velit commodo id id. Labore proident velit occaecat reprehenderit ullamco aliqua
                  reprehenderit exercitation. nostrud mollit amet. Pariatur deserunt amet exercitation duis Read more...
               </TextDefault>

               <TouchableOpacity>
                  <TextDefault style={{ color: btnPrimary }}>Read More</TextDefault>
               </TouchableOpacity>
               <Separator height={20} />

               <MapView
                  initialRegion={{
                     latitude: infoMap.LATITUDE,
                     longitude: infoMap.LONGITUDE,
                     latitudeDelta: infoMap.LATITUDE_DELTA,
                     longitudeDelta: infoMap.LONGITUDE_DELTA,
                  }}
                  style={{ width: '100%', height: 200, borderRadius: 20 }}
                  ref={mapViewRef}
               >
                  <Marker
                     coordinate={{ latitude: infoMap.LATITUDE, longitude: infoMap.LONGITUDE }}
                     title="Điểm bắt đầu"
                     description="Origin Point"
                     pinColor={blackColor}
                     icon={localImages().originIcon}
                  />
               </MapView>

               <Separator height={20} />
               <FlatList
                  horizontal={true}
                  style={{ flex: 1 }}
                  ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                  data={[{ id: 12 }, { id: 2 }, { id: 3 }]}
                  renderItem={_renderItem}
                  keyExtractor={(item) => item.id.toString()}
               />

               <Separator height={10} />
            </Row>
         </ScrollView>
         <Row full center colGap={20} style={[styleGlobal.shadowForce, { padding: 10 }]}>
            <ButtonCustom
               onPress={() => {}}
               title={''}
               startIcon={
                  <Icon
                     link={localImages().saveLocationIcon}
                     style={{
                        width: 20,
                        height: 20,
                     }}
                  />
               }
               style={{ padding: 10, width: 100 }}
               textColor={btnPrimary}
               background={whiteColor}
            />
            <ButtonCustom
               primary
               onPress={() => navigate(ROUTE_KEY.DIRECTION)}
               title={'Director'}
               full
               style={{ width: 200, padding: 10 }}
               endIcon={<MaterialIcons name="directions" size={20} color={whiteColor} />}
            />
         </Row>
      </MainLayout>
   );
}

export default DetailLocationScreen;
