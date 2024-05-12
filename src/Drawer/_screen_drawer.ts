import HomeScreen from 'src/screens/BottomTab/Home';
import { localImages } from 'assets/localImage';
import { ROUTE_KEY } from '@navigation/route';
import SaveLocation from 'src/screens/Includes/SaveLocation';
import SaveFood from 'src/screens/Includes/SaveFood';

export const _SCREENS_DRAWER = [
   {
      name: 'Home',
      route: ROUTE_KEY.HOME,
      component: HomeScreen,
      iconActive: localImages().homeIcon,
      icon: localImages().homeIcon,
   },
   {
      name: 'Location saved',
      route: ROUTE_KEY.SAVED_LOCATION,
      component: SaveLocation,
      iconActive: localImages().locationIcon,
      icon: localImages().locationIcon,
   },
   {
      name: 'Food saved',
      route: ROUTE_KEY.SAVED_FOOD,
      component: SaveFood,
      iconActive: localImages().foodIcon,
      icon: localImages().foodIcon,
   },
];
