import React, { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from 'src/Models/user.model';
import { clearUserData, getUserInfo, saveToken, saveUserInfo } from './login.utils';
import { useLoading } from './loadingGlobalContext';
import { ActivityIndicator } from 'react-native';
import { btnPrimary } from '@constants/Colors';
import { signOut } from 'firebase/auth';
import { authFirebase } from 'src/config/firebaseWeb';
import { ILoginResponse } from 'src/Models/loginResponse.dto';

interface ToastContextValue {
   user: IUser | null;
   login: (userData: ILoginResponse, isLoginGoogle?: boolean) => void;
   logout: () => void;
}

const AuthContext = createContext<ToastContextValue | undefined>(undefined);

export const useToastContext = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useToastContext must be used within an AuthProvider');
   }
   return context;
};

interface PropsType {
   children: React.ReactNode;
}
export const AuthProvider = ({ children }: PropsType) => {
   const [user, setUser] = useState<IUser | null>(null);
   const { startLoading, stopLoading } = useLoading();
   const [isLoading, setIsLoading] = useState(true);
   const [isLoginWithGoogle, serIsLoginWithGoogle] = useState<boolean>(false);

   const login = (userData: ILoginResponse, isLoginGoogle?: boolean) => {
      startLoading();
      setTimeout(async () => {
         isLoginGoogle && serIsLoginWithGoogle(isLoginGoogle);
         isLoginGoogle && console.log('====================== login with google');
         if (userData?.token) {
            setUser(userData?.user);
            await saveUserInfo(userData?.user);
         }
         userData?.token && (await saveToken(userData?.token));
         stopLoading();
      }, 1000);
   };

   const logout = () => {
      startLoading();
      setTimeout(async () => {
         if (isLoginWithGoogle) {
            await signOut(authFirebase);
         }
         setUser(null);
         await clearUserData();
         stopLoading();
      }, 1000);
   };

   const initUserInfo = async () => {
      startLoading();
      setIsLoading(true);
      const userData = await getUserInfo();
      stopLoading();
      setIsLoading(false);
      userData && setUser(userData);
   };

   useEffect(() => {
      initUserInfo();
   }, []);

   if (isLoading) return <ActivityIndicator color={btnPrimary} />;
   return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
