import HomeScreen from 'src/screens/BottomTab/Home';
import { ROUTE_KEY } from './route';
import PersonalScreen from 'src/screens/BottomTab/Personal';
import { localImages } from 'assets/localImage';
import DetailLocationScreen from 'src/screens/Includes/DetailLocation';
import DirectionScreen from 'src/screens/Includes/Direction';
import DetailFood from 'src/screens/Includes/DetailFood';
import SearchLocation from 'src/screens/Includes/Search';

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
   {
      route: ROUTE_KEY.SEARCH,
      component: SearchLocation,
      iconActive: localImages().userActiveIcon,
      icon: localImages().userIcon,
   },
];
