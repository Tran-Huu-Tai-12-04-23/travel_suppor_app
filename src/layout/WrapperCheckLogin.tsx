import { useAuth } from '@context/authContext';
import { useLoading } from '@context/loadingGlobalContext';
import { getUserInfo } from '@context/login.utils';
import { useEffect } from 'react';

function WrapperCheckLogin({ children }: any) {
   const { startLoading, stopLoading } = useLoading();
   const { setUser } = useAuth();
   useEffect(() => {
      const getUserExist = async () => {
         startLoading();
         const userData = await getUserInfo();
         stopLoading();
         userData && setUser(userData);
      };
      getUserExist();
   }, []);
   return { children };
}

export default WrapperCheckLogin;
