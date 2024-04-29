import HomeScreen from 'src/screens/BottomTab/Home';
import { ROUTE_KEY } from './route';
import PersonalScreen from 'src/screens/BottomTab/Personal';
import { localImages } from 'assets/localImage';
import HomeDrawer from 'src/Drawer/HomeDrawer';
import DetailLocationScreen from 'src/screens/Includes/DetailLocation';
import DirectionScreen from 'src/screens/Includes/Direction';
import DetailFood from 'src/screens/Includes/DetailFood';
import ScheduleScreen from 'src/screens/BottomTab/Schedule';
import TextToSpeakScreen from 'src/screens/BottomTab/TextToSpeak';

export const _DETAIL_SCREENS = [
   {
      route: ROUTE_KEY.DETAIL_LOCATION,
      component: DetailLocationScreen,
      iconActive: localImages().userActiveIcon,
      icon: localImages().userIcon,
   },
   {
      route: ROUTE_KEY.DIRECTION,
      component: DirectionScreen,
      iconActive: localImages().userActiveIcon,
      icon: localImages().userIcon,
   },
   {
      route: ROUTE_KEY.DETAIL_FOOD,
      component: DetailFood,
      iconActive: localImages().userActiveIcon,
      icon: localImages().userIcon,
   },
];
