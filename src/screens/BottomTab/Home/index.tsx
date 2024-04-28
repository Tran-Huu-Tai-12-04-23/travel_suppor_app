import Avatar from '@components/Avatar';
import ButtonCustom from '@components/ButtonCustom';
import FoodItem from '@components/FoodItem';
import Icon from '@components/Icon';
import LocationItem from '@components/LocationItem';
import Row from '@components/Row';
import Separator from '@components/Separator';
import TextDefault from '@components/TextDefault';
import TextInputCustom from '@components/TextInputCustom';
import { blackColor, btnPrimary, whiteColor } from '@constants/Colors';
import { useAuth } from '@context/authContext';
import MainLayout from '@layout/MainLayout';
import { openDrawer } from '@navigation/NavigationService';
import { localImages } from 'assets/localImage';
import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styleGlobal } from 'src/styles';

const districts = [
   {
      key: 1,
      name: 'District 1',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmi3BslW2sqMbOe_KrwB-p5uOM1mcp9vssGg2exoJR8g&s',
   },
   {
      key: 2,
      name: 'District 2',
      img: 'https://nasaland.vn/wp-content/uploads/2022/09/Quan-2-1.jpg',
   },
   {
      key: 3,
      name: 'District 3',
      img: 'https://cdnmedia.baotintuc.vn/Upload/of1YDQmgYWjUVVEP2wPLg/files/2019/10/Quan3/a12.jpg',
   },
   {
      key: 4,
      name: 'District 4',
      img: 'https://statics.vinpearl.com/quan-4-co-gi-choi-1_1630224675.jpg',
   },
   {
      key: 5,
      name: 'District 5',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLRloQ4f-tPIspfn4egOkgIxazxTDFzJQYota3FPPN6Q&s',
   },
   {
      key: 6,
      name: 'District 6',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4DgDR9h4aVMVPEql6pCfSBjZ5IBm3KV7dmIhvnX4iEA&s',
   },
   {
      key: 7,
      name: 'District 7',
      img: 'https://image.sggp.org.vn/w1000/Uploaded/2024/aopovun/2023_11_23/mot-goc-quan-7-ve-dem-6945.jpg.webp',
   },
];
function HomeScreen() {
   const _renderItem = ({ item }: { item: any }) => <LocationItem width={250} />;
   const _renderFoodItem = ({ item }: { item: any }) => <FoodItem width={250} />;
   return (
      <MainLayout>
         <ScrollView>
            <Row between full colGap={20} style={{ alignItems: 'flex-start' }}>
               <Row start colGap={20}>
                  <TouchableOpacity onPress={openDrawer}>
                     <Avatar
                        link={{
                           uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTWcCiaYRwLtYTSP7wf3wgPCo-ExPN2OZtFu16Hbx8Qg&s',
                        }}
                     />
                  </TouchableOpacity>
                  <TextDefault style={{ marginTop: 'auto' }}>
                     Hello,
                     <TextDefault bold style={{ fontSize: 22 }}>
                        Niara!
                     </TextDefault>
                  </TextDefault>
               </Row>

               <ButtonCustom
                  onPress={() => {}}
                  title={''}
                  primary={false}
                  mode="contained"
                  minWidth={50}
                  style={{ padding: 20 }}
                  startIcon={<Icon link={localImages().micIcon} style={{ height: 20, width: 20 }} />}
               />
            </Row>

            <Separator height={10} />
            <TextDefault style={[styleGlobal.textHeader, { color: blackColor }]}>Find Your Stay</TextDefault>
            <Separator height={10} />

            <Row between wrap colGap={10}>
               <TextInputCustom flex={8} placeholder="Where do you go?" />
               <ButtonCustom
                  minWidth={50}
                  radius={10}
                  primary
                  style={{ padding: 16 }}
                  startIcon={<Icon link={localImages().filterIcon} style={{ height: 20, width: 20 }} />}
                  onPress={() => {}}
                  title={''}
               />
            </Row>
            <Separator height={20} />
            <ScrollView horizontal={true}>
               <Row start colGap={30}>
                  {districts.map((dis) => (
                     <Row direction="column" rowGap={4} center key={dis.key}>
                        <Avatar size={70} link={{ uri: dis.img }} />
                        <TextDefault bold>{dis.name}</TextDefault>
                     </Row>
                  ))}
               </Row>
            </ScrollView>
            <Separator height={20} />
            <Row between full>
               <TextDefault bold style={{ fontSize: 22 }}>
                  Famous places
               </TextDefault>

               <ButtonCustom onPress={() => {}} title={'View all'} mode="text" />
            </Row>
            <FlatList
               horizontal={true}
               ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
               contentContainerStyle={{ paddingBottom: 20 }}
               data={[{ id: 12 }, { id: 2 }, { id: 3 }]}
               renderItem={_renderItem}
               keyExtractor={(item) => item.id.toString()}
            />

            <Row between full>
               <TextDefault bold style={{ fontSize: 22 }}>
                  Famous foods
               </TextDefault>

               <ButtonCustom onPress={() => {}} title={'View all'} mode="text" />
            </Row>
            <FlatList
               horizontal={true}
               ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
               contentContainerStyle={{ paddingBottom: 20 }}
               data={[{ id: 12 }, { id: 2 }, { id: 3 }]}
               renderItem={_renderFoodItem}
               keyExtractor={(item) => item.id.toString()}
            />
            <Separator height={100} />
         </ScrollView>
      </MainLayout>
   );
}

export default HomeScreen;
