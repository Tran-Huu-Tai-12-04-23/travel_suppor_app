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
import FoodItem from '@components/FoodItem';

function DetailFood() {
   const infoMap = infoArea(10.7326452, 106.697189);
   const mapViewRef = useRef<MapView>(null);

   const [isViewerImg, setIsViewerImg] = useState(false);
   const [images, setImages] = useState([
      'https://assets.bonappetit.com/photos/61ba71c255a75f7507698f22/master/w_1600%2Cc_limit/Dame_credit_Evan%2520Sung.jpg',
      'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?cs=srgb&dl=pexels-ella-olsson-572949-1640772.jpg&fm=jpg',
      'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
      'https://media.istockphoto.com/id/1457979959/photo/snack-junk-fast-food-on-table-in-restaurant-soup-sauce-ornament-grill-hamburger-french-fries.webp?b=1&s=170667a&w=0&k=20&c=A_MdmsSdkTspk9Mum_bDVB2ko0RKoyjB7ZXQUnSOHl0=',
   ]);

   // const _renderItem = ({ item }: { item: any }) => <FoodItem width={250} />;

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
               <TextDefault style={styleGlobal.textHeader}>Ground Beef Tacos</TextDefault>
               <TouchableOpacity style={{ paddingVertical: 10 }}>
                  <TextDefault style={{ color: btnPrimary, textDecorationLine: 'underline' }}>See review</TextDefault>
               </TouchableOpacity>
               <TextDefault>
                  Brown the beef better. Lean ground beef – I like to use 85% lean angus. Garlic – use fresh chopped.
                  Spices – chili powder, cumin, onion powder.
               </TextDefault>
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
               {/* <FlatList
                  horizontal={true}
                  style={{ flex: 1 }}
                  ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                  data={[{ id: 12 }, { id: 2 }, { id: 3 }]}
                  renderItem={_renderItem}
                  keyExtractor={(item) => item.id.toString()}
               /> */}

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
               onPress={() => navigate(ROUTE_KEY.DIRECTION)}
               title={'Director'}
               full
               primary
               style={{ width: 200, padding: 10 }}
               endIcon={<MaterialIcons name="directions" size={20} color={whiteColor} />}
            />
         </Row>
      </MainLayout>
   );
}

export default DetailFood;
