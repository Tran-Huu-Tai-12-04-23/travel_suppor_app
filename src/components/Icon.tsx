import React from 'react';
import { Image } from 'react-native';
import { styleGlobal } from 'src/styles';

function Icon({ link, style = {} }: { link: any; style?: any }) {
   return <Image source={link} style={[styleGlobal.icon, { ...style }]} resizeMode="contain" />;
}

export default Icon;
