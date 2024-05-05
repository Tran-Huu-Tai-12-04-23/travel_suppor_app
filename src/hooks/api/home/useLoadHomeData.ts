import { useMutation } from '@tanstack/react-query';
import endpoints from 'src/services/endpoints';
import rootApi from 'src/services/rootApi';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { IFood } from 'src/Models/food.model';
import { ILocation } from 'src/Models/location.model';

type loadHomeDataParams = {
   userLocation: {
      latitude: number;
      longitude: number;
   } | null;
};

type HomeResponse = {
   data: {
      foods: IFood[];
      locations: ILocation[];
   };
};

const useLogin = () => {
   const { isLoading, isError, data, error, mutateAsync } = useMutation({
      mutationFn: (variables: loadHomeDataParams) => {
         return rootApi.post<loadHomeDataParams, HomeResponse>(endpoints.LOAD_DATA_HOME, variables);
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

export default useLogin;
