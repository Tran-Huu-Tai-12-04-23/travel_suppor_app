import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
   apiKey: 'AIzaSyB3Po25Xnsl8suNV95kU9V_4TDGzk6Ua8g',
   authDomain: 'travelappsu.firebaseapp.com',
   projectId: 'travelappsu',
   storageBucket: 'travelappsu.appspot.com',
   messagingSenderId: '1054577620610',
   appId: '1:1054577620610:web:92487b9cdcc38a5eb9a69b',
   measurementId: 'G-2P50HC81TS',
};

// /=======

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
   persistence: getReactNativePersistence(AsyncStorage),
});

export const authFirebase = getAuth(app);

//isoClientId : 160269674777-v6tbcapbjm94b38geel3oqjv93nobkgu.apps.googleusercontent.com

// android = 160269674777-vgip01g5m7rpiho6k96scv8se2uuf43t.apps.googleusercontent.com
