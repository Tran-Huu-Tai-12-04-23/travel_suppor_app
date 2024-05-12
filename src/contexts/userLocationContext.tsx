import React, { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from 'src/Models/user.model';
import { clearUserData, getUserInfo, saveToken, saveUserInfo } from './login.utils';
import { useLoading } from './loadingGlobalContext';
import { ActivityIndicator } from 'react-native';
import { btnPrimary } from '@constants/Colors';
import { signOut } from 'firebase/auth';
import { authFirebase } from 'src/config/firebaseWeb';
import { ILoginResponse } from 'src/Models/loginResponse.dto';

interface UserLocationContextValue {
   userLocation: {
      latitude: number;
      longitude: number;
   } | null;
   setUserLocation: any;
}

const AuthContext = createContext<UserLocationContextValue | undefined>(undefined);

export const useUserLocation = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useUserLocation be used within an UserLocationProvider');
   }
   return context;
};

interface PropsType {
   children: React.ReactNode;
}
export const UserLocationProvider = ({ children }: PropsType) => {
   const [userLocation, setUserLocation] = useState({
      latitude: 10.743321644716596,
      longitude: 106.68507499797778,
   });

   return <AuthContext.Provider value={{ userLocation, setUserLocation }}>{children}</AuthContext.Provider>;
};
