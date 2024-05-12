import { Dimensions } from 'react-native';

export const infoArea = (LATITUDE: number, LONGITUDE: number) => {
   const LATITUDE_DELTA = 0.0922;
   const ASPECT_RATIO = Dimensions.get('window').width / Dimensions.get('window').height;
   const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
   return {
      LATITUDE,
      LONGITUDE,
      ASPECT_RATIO,
      LONGITUDE_DELTA,
      LATITUDE_DELTA,
   };
};
