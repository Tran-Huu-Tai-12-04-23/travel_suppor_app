import { useQuery } from '@tanstack/react-query';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { ILocation } from 'src/Models/location.model';
import endpoints from 'src/services/endpoints';
import rootApi from 'src/services/rootApi';

export type variables = {
   locationId: string;
};
type response = {
   data: {
      currentLocation: ILocation;
      nearLocations: ILocation[];
   };
};
const useFindDetailLocation = (variables: variables) => {
   const { data, isLoading, error } = useQuery({
      queryKey: [endpoints.FIND_DETAIL_LOCATION, variables],
      queryFn: () => rootApi.get<variables, response>(endpoints.FIND_DETAIL_LOCATION, { params: variables }),
      onError: (err: { message: string }) => {
         Toast.show({
            title: err?.message,
            type: ALERT_TYPE.DANGER,
         });
      },
      onSuccess: (data) => {},
   });

   return {
      data: data?.data ?? null,
      isLoading: isLoading,
      error: error,
   };
};

export default useFindDetailLocation;
