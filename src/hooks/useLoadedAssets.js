import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';

export function useLoadedAssets() {
   const [isLoadingComplete, setLoadingComplete] = React.useState(false);

   // Load any resources or data that we need prior to rendering the app
   React.useEffect(() => {
      async function loadResourcesAndDataAsync() {
         try {
            SplashScreen.preventAutoHideAsync();

            // Load fonts
            await Font.loadAsync(Ionicons.font);
         } catch (e) {
            // We might want to provide this error information to an error reporting service
            console.warn(e);
         } finally {
            setLoadingComplete(true);
            SplashScreen.hideAsync();
         }
      }

      loadResourcesAndDataAsync();
   }, []);

   React.useEffect(() => {
      const initAppUpdate = async () => {
         try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
               await Updates.fetchUpdateAsync();
               await Updates.reloadAsync();
            }
         } catch (e) {}
      };

      initAppUpdate();
   }, []);

   React.useEffect(() => {
      const update = async () => {
         try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
               await Updates.fetchUpdateAsync();
               // ... thông báo cho người dùng về bản cập nhật ...
               await Updates.reloadAsync();
            }
         } catch (e) {
            console.log(e);
         }
      };

      update();
   }, []);

   return isLoadingComplete;
}
