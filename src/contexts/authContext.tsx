import React, { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from 'src/Models/user.model';
import { clearUserData, getUserInfo, saveUserInfo } from './login.utils';
import { useLoading } from './loadingGlobalContext';
import TextDefault from '@components/TextDefault';
import { ActivityIndicator } from 'react-native';
import { btnPrimary } from '@constants/Colors';

interface AuthContextValue {
   user: IUser | null;
   login: (userData: IUser) => void;
   logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
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

   const login = (userData: IUser) => {
      startLoading();
      setTimeout(() => {
         setUser(userData);
         saveUserInfo(userData);
         stopLoading();
      }, 1000);
   };

   const logout = () => {
      startLoading();
      setTimeout(() => {
         setUser(null);
         clearUserData();
         stopLoading();
      }, 1000);
   };

   const initUserInfo = async () => {
      startLoading();
      setIsLoading(true);
      const userData = await getUserInfo();
      stopLoading();
      setIsLoading(false);
      userData && login(userData);
   };

   useEffect(() => {
      initUserInfo();
   }, []);

   if (isLoading) return <ActivityIndicator color={btnPrimary} />;
   return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
