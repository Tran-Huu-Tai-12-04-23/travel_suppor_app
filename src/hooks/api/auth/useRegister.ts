import { navigate } from '@navigation/NavigationService';
import { ROUTE_KEY } from '@navigation/route';
import { useMutation } from '@tanstack/react-query';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { IUser } from 'src/Models/user.model';
import endpoints from 'src/services/endpoints';
import rootApi from 'src/services/rootApi';

type LoginResponse = {
   data: any;
};

const useRegister = () => {
   const { isLoading, isError, data, error, mutateAsync } = useMutation({
      mutationFn: (variables: IUser) => {
         return rootApi.post<IUser, LoginResponse>(endpoints.REGISTER, variables);
      },
      onError: (e: any) => {
         alert(e?.response?.data?.message || 'Đã có lỗi xảy ra');
      },
      onSuccess: (e: any) => {
         Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Register successfully! Login now',
            button: 'Oke',
            onPressButton: () => {
               Dialog.hide();
               navigate(ROUTE_KEY.LOGIN);
            },
         });
      },
   });

   return {
      isLoading,
      isError,
      data,
      error,
      onRegister: mutateAsync,
   };
};

export default useRegister;
