import ButtonCustom from '@components/ButtonCustom';
import Icon from '@components/Icon';
import Row from '@components/Row';
import TextDefault from '@components/TextDefault';
import { blackColor, borderColor, btnPrimary, secondaryColor, whiteColor } from '@constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { navigate } from '@navigation/NavigationService';
import { ROUTE_KEY } from '@navigation/route';
import { localImages } from 'assets/localImage';
import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styleGlobal } from 'src/styles';

type PropsType = {
   width: any;
};
function FoodItem({ width = 150 }: PropsType) {
   return (
      <TouchableOpacity
         onPress={() => {
            navigate(ROUTE_KEY.DETAIL_FOOD);
         }}
      >
         <Row direction="column" style={[{ marginTop: -50, width: width, borderRadius: 20 }]}>
            <Image
               style={[{ transform: [{ translateY: 60 }], zIndex: 1000, width: '90%', height: 100, borderRadius: 10 }]}
               source={{
                  uri: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
               }}
            />

            <Row
               between
               full
               style={[
                  {
                     padding: 20,
                     borderRadius: 20,
                     backgroundColor: borderColor,
                     alignContent: 'center',
                     alignItems: 'center',
                     paddingTop: 70,
                  },
               ]}
            >
               <Row start direction="column" rowGap={4}>
                  <TextDefault bold style={{ fontSize: 24 }}>
                     Chicken Hawaiian
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

export default FoodItem;
