import { localImages } from 'assets/localImage';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function ImgBackgroundLayout({ children }: any) {
   const insets = useSafeAreaInsets();
   return (
      <ImageBackground source={localImages().bg} style={styles.backgroundImage}>
         <View style={{ paddingTop: insets.top }}></View>
         {children}
      </ImageBackground>
   );
}

const styles = StyleSheet.create({
   backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
   },
});

export default ImgBackgroundLayout;
