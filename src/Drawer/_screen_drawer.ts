import HomeScreen from 'src/screens/BottomTab/Home';
import { localImages } from 'assets/localImage';
import { ROUTE_KEY } from '@navigation/route';
import SaveLocation from 'src/screens/Includes/SaveLocation';

export const _SCREENS_DRAWER = [
   {
      route: ROUTE_KEY.HOME,
      component: HomeScreen,
      iconActive: localImages().homeActiveIcon,
      icon: localImages().homeIcon,
   },
   {
      route: ROUTE_KEY.SAVED_LOCATION,
      component: SaveLocation,
      iconActive: localImages().saveLocationIcon,
      icon: localImages().saveLocationIcon,
   },
];
