import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from 'src/Models/user.model';

export const saveUserInfo = async (userInfo: IUser) => {
   try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      console.log('=============> User info saved successfully!');
   } catch (error) {
      console.error('Error saving user info:', error);
   }
};
export const clearUserData = async () => {
   try {
      await AsyncStorage.removeItem('userInfo');
      console.log(' =============>  User logged out successfully!');
   } catch (error) {
      console.error('Error logging out:', error);
   }
};
export const getUserInfo = async (): Promise<IUser | null> => {
   try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo !== null) {
         return JSON.parse(userInfo);
      } else {
         return null;
      }
   } catch (error) {
      console.error('Error checking user login status:', error);
      throw error;
   }
};
