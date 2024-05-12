import ButtonCustom from '@components/ButtonCustom';
import Icon from '@components/Icon';
import Row from '@components/Row';
import Separator from '@components/Separator';
import TextDefault from '@components/TextDefault';
import TextInputCustom from '@components/TextInputCustom';
import { blackColor, btnPrimary, whiteColor } from '@constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import MainLayout from '@layout/MainLayout';
import CustomHeader from '@navigation/CustomHeader';
import { goBack } from '@navigation/NavigationService';
import { localImages } from 'assets/localImage';
import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Chip } from 'react-native-paper';
import { styleGlobal } from 'src/styles';
import { debounce, head } from 'lodash';
import LocationItem from '@components/LocationItem';
import { deviceWidth } from '@helper/utils';

enum FILTER {
   ALL,
   FOOD,
   LOCATION,
}

const filters = [
   {
      key: FILTER.ALL,
      name: 'ALl',
      icon: null,
   },
   {
      key: FILTER.LOCATION,
      name: 'Location',
      icon: <Icon link={localImages().locationIcon} style={{ height: 18 }} />,
   },
   {
      key: FILTER.FOOD,
      name: 'Food',
      icon: <Icon link={localImages().foodIcon} style={{ height: 18 }} />,
   },
];

function SearchLocation() {
   const [isLoading, setIsLoading] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [typeSearch, setTypeSearch] = useState<FILTER>(FILTER.ALL);
   const debouncedOnChangeText = debounce((text: string) => {
      setIsLoading(false);
   }, 1000);

   const handleTextChange = (text: string) => {
      setSearchQuery(text);
      setIsLoading(true);

      setTimeout(() => {
         debouncedOnChangeText(text);
      }, 500);
   };

   const _renderLocationItem = ({ item, index }: { item: any; index: number }) => (
      <Row full key={index} style={{ paddingBottom: index !== 4 ? 0 : 50 }}>
         <LocationItem key={index} width={deviceWidth - 20} data={item} />
      </Row>
   );
   return (
      <MainLayout style={{ background: whiteColor, paddingTop: 10, paddingBottom: 0, paddingHorizonTal: 10 }}>
         <Row between wrap colGap={20}>
            <TouchableOpacity
               onPress={goBack}
               style={[
                  styleGlobal.shadowForce,
                  styleGlobal.center,
                  {
                     maxWidth: 40,
                     borderRadius: 100,
                     backgroundColor: whiteColor,
                     height: 40,
                     width: 40,
                     padding: 20,
                  },
               ]}
            >
               <Icon link={localImages().arrBackIcon} style={{ width: 14, height: 14 }} />
            </TouchableOpacity>
            <TextInputCustom onChangeText={handleTextChange} flex={8} placeholder="Where do you go?" />
         </Row>

         <Separator height={10} />
         <Row style={{ padding: 10 }} colGap={20}>
            {filters.map((filter) => (
               <ButtonCustom
                  mode="contained"
                  primary={typeSearch === filter.key}
                  startIcon={filter.icon}
                  key={filter.key}
                  onPress={() => setTypeSearch(filter.key)}
                  title={filter.name}
               ></ButtonCustom>
            ))}
         </Row>
         {isLoading && (
            <Row direction="column" center style={{ padding: '10%' }} rowGap={20}>
               <TextDefault bold>Searching...</TextDefault>
               <ActivityIndicator color={btnPrimary} />
            </Row>
         )}

         {!isLoading && (
            <FlatList
               style={{ paddingTop: 10 }}
               data={[1, 2, 3, 4, 5]}
               renderItem={_renderLocationItem}
               keyExtractor={(item) => item.toString()}
            />
         )}
      </MainLayout>
   );
}

export default SearchLocation;
