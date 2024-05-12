import { ILocation } from 'src/Models/location.model';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ALERT_TYPE, AlertNotificationToast, Toast } from 'react-native-alert-notification';
import { IFood } from 'src/Models/food.model';
import endpoints from 'src/services/endpoints';
import rootApi, { predictApi } from 'src/services/rootApi';

export type variables = {
   image_url: string;
   location?: [number, number];
};
type response = {
   data: {
      location: ILocation | null;
      food: IFood | null;
      meta: [number, number] | null; // user location
   };
};
const usePredictImage = () => {
   const {
      isLoading,
      isError,
      data,
      error,
      mutateAsync: onPredict,
   } = useMutation({
      mutationFn: (variables: variables) => {
         return rootApi.post<variables, response>(endpoints.PREDICT_IMG, variables, {});
      },
      onError: (e: any) => {
         Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: e?.response?.data?.message || 'Has error, ...',
         });
      },
      onSuccess: (data) => {},
   });

   return {
      data: data?.data ?? null,
      isLoading: isLoading,
      error: error,
      onPredict,
   };
};

export default usePredictImage;
