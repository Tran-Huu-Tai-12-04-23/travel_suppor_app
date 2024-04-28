import React from 'react';
import { Image } from 'react-native';
import { styleGlobal } from 'src/styles';

function Avatar({ link, size }: { link: any; size?: number }) {
   return <Image source={link} style={[{ width: size ? size : 45, height: size ? size : 45, borderRadius: 100 }]} />;
}

export default Avatar;
