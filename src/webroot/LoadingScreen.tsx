import Row from '@components/Row';
import { btnPrimary } from '@constants/Colors';
import { deviceHeight } from '@helper/utils';
import React from 'react';
import { ActivityIndicator } from 'react-native';

function LoadingScreen() {
   return (
      <Row full center style={{ flex: 1, height: deviceHeight }}>
         <ActivityIndicator size={'large'} color={btnPrimary} />
      </Row>
   );
}

export default LoadingScreen;
