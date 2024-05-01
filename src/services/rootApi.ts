import initApi from './initApi';

const rootApi = initApi(process.env.EXPO_PUBLIC_LINK_API);

export default rootApi;
