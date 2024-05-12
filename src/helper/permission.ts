import { PermissionsAndroid } from 'react-native';

export async function requestCameraPermission(callBack: () => void) {
   try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
         title: 'Camera Permission',
         message: 'App needs access to your camera',
         buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         console.log('=====================Camera permission granted');
         callBack();
      } else {
         console.log('=====================Camera permission denied');
      }
   } catch (err) {
      console.warn(err);
   }
}
export async function checkPermissionCamera(callback: () => void) {
   try {
      const isProvided = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (isProvided) {
         callback();
      } else {
         await requestCameraPermission(callback);
      }
   } catch (err) {
      console.warn(err);
   }
}

export async function requestStoragePermission(callBack: () => void) {
   try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
         title: 'Storage Permission',
         message: 'App needs access to your storage',
         buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         console.log('================Storage permission granted');
         callBack();
      } else {
         console.log('================Storage permission denied');
      }
   } catch (err) {
      console.warn(err);
   }
}
export async function checkPermissionStorage(callBack: () => void) {
   try {
      const isProvided = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      if (isProvided) {
         callBack();
      } else {
         await requestStoragePermission(callBack);
      }
   } catch (err) {
      console.warn(err);
   }
}
