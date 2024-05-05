import initApi from './initApi';

console.log('link api  =====>' + process.env.EXPO_PUBLIC_LINK_API);
const rootApi = initApi(process.env.EXPO_PUBLIC_LINK_API);

export default rootApi;
