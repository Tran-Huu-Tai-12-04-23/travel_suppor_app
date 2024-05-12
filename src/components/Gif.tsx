import React from 'react';
import Gif from 'react-native-gif';

function GifImage({ source }: { source: any }) {
   return <Gif source={source} style={{ width: 200, height: 200 }} />;
}

export default GifImage;
