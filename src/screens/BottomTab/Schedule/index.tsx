import TabComponent from '@components/TabComponent';
import MainLayout from '@layout/MainLayout';
import React from 'react';
import LocationSchedule from './LocationSchedule';
import FoodSchedule from './FoodSchedule';
import CustomHeader from '@navigation/CustomHeader';
import { SafeAreaView } from 'react-native';
import Separator from '@components/Separator';
import { whiteColor } from '@constants/Colors';
import { deviceHeight } from '@helper/utils';

function ScheduleScreen() {
   return (
      <MainLayout style={{ backgroundColor: whiteColor, minHeight: deviceHeight }}>
         <TabComponent tabs={[<LocationSchedule />, <FoodSchedule />]} names={['Location Schedule', 'Food Schedule']} />
      </MainLayout>
   );
}

export default ScheduleScreen;
