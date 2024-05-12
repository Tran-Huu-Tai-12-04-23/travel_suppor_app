import GifImage from '@components/Gif';
import Row from '@components/Row';
import TextDefault from '@components/TextDefault';
import { whiteColor } from '@constants/Colors';
import MainLayout from '@layout/MainLayout';
import CustomHeader from '@navigation/CustomHeader';
import { GIF_LINK } from 'assets/Gif';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type PropsType = {
   title?: string;
};
function NotFoundIdentity(props: PropsType) {
   const { title = 'Not Found Identity' } = props;
   return (
      <MainLayout style={{ backgroundColor: whiteColor }}>
         <SafeAreaView>
            <CustomHeader title={''} />
         </SafeAreaView>
         <Row direction="column" full style={{ flex: 1, backgroundColor: whiteColor }} rowGap={20} center>
            <TextDefault bold>{title}</TextDefault>
            <GifImage source={GIF_LINK.WARNING} />
         </Row>
      </MainLayout>
   );
}

export default NotFoundIdentity;
