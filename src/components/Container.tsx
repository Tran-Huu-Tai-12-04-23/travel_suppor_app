import React from 'react';
import { View } from 'react-native';
import { styleGlobal } from 'src/styles';

type PropsType = {
   children: any;
   style?: any;
};
function Container({ children, style }: PropsType) {
   return <View style={[styleGlobal.container, style]}>{children}</View>;
}

export default Container;
