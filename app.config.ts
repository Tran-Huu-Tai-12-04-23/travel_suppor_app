import dotenv from 'dotenv';
import { ExpoConfig } from '@expo/config';

dotenv.config();

const envs = {
   development: {
      EXPO_PUBLIC_APP_VARIANT: 'dev',
      EXPO_PUBLIC_APP_NAME: 'travelsupporappdev',
      EXPO_PUBLIC_BUNDLE_ID: 'com.travelsupport.app',
      EXPO_PUBLIC_LINK_API: 'http://192.168.1.15:3000/api',
   },
   production: {
      EXPO_PUBLIC_APP_VARIANT: 'prod',
      EXPO_PUBLIC_APP_NAME: 'travelsupporapp',
      EXPO_PUBLIC_BUNDLE_ID: 'com.travelsupport.app',
      EXPO_PUBLIC_LINK_API: 'http://192.168.1.15:3000/api',
   },
};

const { EXPO_PUBLIC_APP_VARIANT, EXPO_PUBLIC_APP_NAME, EXPO_PUBLIC_BUNDLE_ID } =
   envs[(process.env.NODE_ENV as keyof typeof envs) || 'production'];

if (EXPO_PUBLIC_BUNDLE_ID == null) {
   throw new Error('EXPO_PUBLIC_BUNDLE_ID is not defined');
}

if (EXPO_PUBLIC_APP_NAME == null) {
   throw new Error('EXPO_PUBLIC_APP_NAME is not defined');
}

if (EXPO_PUBLIC_APP_VARIANT == null) {
   throw new Error('EXPO_PUBLIC_APP_VARIANT is not defined');
}

export default (): ExpoConfig => ({
   orientation: 'portrait',
   userInterfaceStyle: 'automatic',
   name: EXPO_PUBLIC_APP_NAME,
   scheme: 'travel_app',
   slug: 'travel-support-app',
   version: '1.0.0',
   icon: './assets/images/logo.png',
   splash: {
      image: './assets/images/splash.png',
      resizeMode: 'cover',
      backgroundColor: 'transparent',
   },
   assetBundlePatterns: ['**/*'],
   web: {
      favicon: './assets/favicon.png',
   },
   owner: 'huutaidev',
   extra: {
      eas: {
         projectId: 'd8244eaa-9515-4e96-a93c-0530eedef759',
      },
   },
   runtimeVersion: '1.0.0',
   updates: {
      enabled: true,
      checkAutomatically: 'ON_LOAD',
      fallbackToCacheTimeout: 0,
      //   url: 'https://u.expo.dev/742d4f33-7ec9-4719-a948-89ec55b4b1eb',
   },
   ios: {
      bundleIdentifier: EXPO_PUBLIC_BUNDLE_ID,
      buildNumber: '3',
      infoPlist: {
         CFBundleAllowMixedLocalizations: true,
      },
   },
   android: {
      permissions: ['android.permission.CAMERA', 'android.permission.READ_EXTERNAL_STORAGE'],
      config: {
         googleMaps: {
            apiKey: 'AIzaSyACFEyucHfjhPUl88GCY1spvYuHi8lNEUA',
         },
      },
      adaptiveIcon: {
         foregroundImage: './assets/images/logo.png',
         backgroundColor: 'transparent',
      },
      versionCode: 3,
      package: EXPO_PUBLIC_BUNDLE_ID,
      userInterfaceStyle: 'automatic',
   },
   plugins: [
      'expo-font',
      'expo-build-properties',
      [
         'expo-camera',
         {
            cameraPermission: 'Allow FnB Emp to access the camera to take pictures about proof of',
         },
      ],
      [
         'expo-media-library',
         {
            photosPermission: 'Allow FnB Emp to access the library to upload pictures about proof of.',
            savePhotosPermission: 'Allow FnB Emp to access the library to upload pictures about proof of',
            isAccessMediaLocationEnabled: true,
         },
      ],
      [
         'expo-build-properties',
         {
            android: {
               kotlinVersion: '1.6.21',
            },
         },
      ],
   ],
});
