import { useMutation } from '@tanstack/react-query';
import endpoints from 'src/services/endpoints';
import rootApi from 'src/services/rootApi';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { IFood } from 'src/Models/food.model';
import { ILocation } from 'src/Models/location.model';

type homeBody = {
   location: [number, number];
};

type HomeResponse = {
   data: {
      foods: IFood[];
      locations: ILocation[];
   };
};

const useLoadHomeData = () => {
   const { isLoading, isError, data, error, mutateAsync } = useMutation({
      mutationFn: (variables: homeBody) => {
         return rootApi.post<homeBody, HomeResponse>(endpoints.LOAD_DATA_HOME, variables);
      },
      onError: (e: any) => {
         Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: e?.response?.data?.message || 'Has error, ...',
         });
      },
   });
   return {
      isLoading,
      isError,
      data: data?.data,
      error,
      onLoadHomeData: mutateAsync,
   };
};

export default useLoadHomeData;
