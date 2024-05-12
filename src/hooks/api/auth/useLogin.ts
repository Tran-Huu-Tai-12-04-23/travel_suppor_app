import { useMutation } from '@tanstack/react-query';
import { ILoginResponse } from 'src/Models/loginResponse.dto';
import { IUser } from 'src/Models/user.model';
import endpoints from 'src/services/endpoints';
import rootApi from 'src/services/rootApi';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { useAuth } from '@context/authContext';

type LoginParams = {
   username: string;
   password: string;
};

type LoginResponse = {
   data: ILoginResponse;
};

const useLogin = () => {
   const { login } = useAuth();
   const { isLoading, isError, data, error, mutateAsync } = useMutation({
      mutationFn: (variables: LoginParams) => {
         return rootApi.post<LoginParams, LoginResponse>(endpoints.LOGIN, variables);
      },
      onError: (e: any) => {
         Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: e?.response?.data?.message || 'Has error, ...',
         });
      },
      onSuccess: (data) => {
         Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Login successfully',
         });

         data?.data && login(data?.data);
      },
   });
   return {
      isLoading,
      isError,
      data: data?.data,
      error,
      onLogin: mutateAsync,
   };
};

export default useLogin;
