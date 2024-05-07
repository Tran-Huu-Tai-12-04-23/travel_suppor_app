import initApi from './initApi';
import preInitApi from './preInitApi';

console.log('link api  =====>' + process.env.EXPO_PUBLIC_LINK_API);
const rootApi = initApi(process.env.EXPO_PUBLIC_LINK_API);
const predictApi = preInitApi(process.env.EXPO_PUBLIC_LINK_API);

export default rootApi;

export { predictApi };
