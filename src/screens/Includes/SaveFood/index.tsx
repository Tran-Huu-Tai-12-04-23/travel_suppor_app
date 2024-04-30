import { whiteColor } from '@constants/Colors';
import MainLayout from '@layout/MainLayout';
import CustomHeader from '@navigation/CustomHeader';
import React from 'react';
import { FlatList, View, Image } from 'react-native';
import SaveFoodItem from './Item';

const foods = [
   {
      key: 1,
      name: 'food image',
      img: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?cs=srgb&dl=pexels-ella-olsson-572949-1640772.jpg&fm=jpg',
   },
   {
      key: 2,
      name: '20+ Best Free Food Pictures on Unsplash',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIawteuYJF3KgNv0RX8TtKWz0_Wdq3HUJ855fEGR5DqA&s',
   },
   {
      key: 3,
      name: 'Free Food Images [HD]: Download Pictures of Food',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9YYZfPJzzYuToi00fAzRIlugRl459mkUGD3KxML6rVRUc85uAulX8NfxCsPpyaedO6Wo&usqp=CAU',
   },
   {
      key: 4,
      name: 'Free food Photos & Pictures | FreeImages',
      img: 'https://images.freeimages.com/images/large-previews/2b6/food-18-1323940.jpg?fmt=webp&w=500',
   },
];

function SaveFood() {
   const _renderLocationItem = ({ item, index }: { item: any; index: number }) => (
      <SaveFoodItem key={index} item={item} />
   );

   return (
      <MainLayout style={{ background: whiteColor, padding: 0 }}>
         <CustomHeader title={''} />
         <FlatList data={foods} renderItem={_renderLocationItem} keyExtractor={(item) => item.key.toString()} />
      </MainLayout>
   );
}

export default SaveFood;
