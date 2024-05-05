import Row from '@components/Row';
import { btnPrimary } from '@constants/Colors';
import React, { useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';

type PropsType = {
   link: string;
   style?: any;
};
const ImageCustom = ({ link, style }: PropsType) => {
   const [isLoading, setIsLoading] = useState(true);

   const handleImageLoad = () => {
      setIsLoading(false);
   };

   return (
      <>
         {isLoading ? (
            <Row full center style={[{ width: 250, height: 200 }]}>
               <ActivityIndicator color={btnPrimary} />
            </Row>
         ) : (
            <Image
               style={{ width: 250, minHeight: 100, ...style }}
               source={{ uri: link }}
               resizeMode="cover"
               onLoadEnd={handleImageLoad}
               onLoad={handleImageLoad}
            />
         )}
         <Image
            style={{ width: 250, minHeight: 100, display: 'none', ...style }}
            source={{ uri: link }}
            onLoadEnd={handleImageLoad}
         />
      </>
   );
};

export default ImageCustom;
