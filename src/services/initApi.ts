import axios from 'axios';
import { getToken } from '@context/login.utils';

const initApi = (url?: string, headers = {}) => {
   if (url == null) throw new Error('URL is required');
   const api = axios.create({
      baseURL: url,
      timeout: 100000,
      headers: {
         'Content-Type': 'application/json',
         accept: '*/*',
         ...headers,
      },
   });

   api.interceptors.request.use(async (config) => {
      try {
         const token = await getToken();
         console.log(token);
         if (token != null) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${token.accessToken}`;
         }
      } catch (error) {
         console.log('AsyncStorage error:', error);
      }
      return config;
   });

   api.interceptors.response.use(
      (response: any) => response,
      (error: { config: { baseURL: string; url: string; data: any; params: any } }) => {
         // Accessing the URL and the body of the request
         console.log('DEVELOPMENT+==================+>');
         console.log('\x1b[31m', 'ERROR REQUEST URL:', error.config?.baseURL + '/' + error.config.url);
         console.log('\x1b[31m', 'ERROR REQUEST Body:', error.config.data);
         console.log('\x1b[31m', 'ERROR REQUEST params:', error.config.params);
         console.log('DEVELOPMENT+==================+>');

         return Promise.reject(error);
      },
   );

   return api;
};

export default initApi;
