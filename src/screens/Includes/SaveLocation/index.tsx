import Row from '@components/Row';
import Separator from '@components/Separator';
import TextDefault from '@components/TextDefault';
import { whiteColor } from '@constants/Colors';
import MainLayout from '@layout/MainLayout';
import CustomHeader from '@navigation/CustomHeader';
import React from 'react';
import { FlatList, View, Image } from 'react-native';
import SaveLocationItem from './Item';

const locations = [
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
      key: 8,
      name: 'District 7',
      img: 'https://image.sggp.org.vn/w1000/Uploaded/2024/aopovun/2023_11_23/mot-goc-quan-7-ve-dem-6945.jpg.webp',
   },
   {
      key: 9,
      name: 'District 4',
      img: 'https://statics.vinpearl.com/quan-4-co-gi-choi-1_1630224675.jpg',
   },
   {
      key: 10,
      name: 'District 5',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLRloQ4f-tPIspfn4egOkgIxazxTDFzJQYota3FPPN6Q&s',
   },
   {
      key: 11,
      name: 'District 6',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4DgDR9h4aVMVPEql6pCfSBjZ5IBm3KV7dmIhvnX4iEA&s',
   },
   {
      key: 12,
      name: 'District 7',
      img: 'https://image.sggp.org.vn/w1000/Uploaded/2024/aopovun/2023_11_23/mot-goc-quan-7-ve-dem-6945.jpg.webp',
   },
];

function SaveLocation() {
   const _renderLocationItem = ({ item, index }: { item: any; index: number }) => (
      <SaveLocationItem key={index} item={item} />
   );

   return (
      <MainLayout style={{ background: whiteColor, padding: 0 }}>
         <CustomHeader title={''} />
         <FlatList data={locations} renderItem={_renderLocationItem} keyExtractor={(item) => item.key.toString()} />
      </MainLayout>
   );
}

export default SaveLocation;
