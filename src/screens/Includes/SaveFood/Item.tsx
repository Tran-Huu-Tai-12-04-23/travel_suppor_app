import Icon from '@components/Icon';
import { dangerColor } from '@constants/Colors';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { deviceWidth } from '@helper/utils';
import { localImages } from 'assets/localImage';
import React, { useRef } from 'react';
import { Animated, StyleSheet, View, Text, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const SaveFoodItem = ({ item }: any) => {
   const swipeableRef = useRef<Swipeable>(null);

   const renderRightActions = (
      progress: Animated.AnimatedInterpolation<number>,
      dragX: Animated.AnimatedInterpolation<number>,
   ) => {
      const trans = dragX.interpolate({
         inputRange: [0, deviceWidth - 100],
         outputRange: [1, -10],
      });
      return (
         <RectButton style={styles.leftAction}>
            <Animated.View
               style={[
                  {
                     transform: [{ translateX: trans }],
                  },
               ]}
            >
               <TouchableOpacity onPress={close}>
                  <Icon link={localImages().trashIcon} style={{ height: 40, width: 40 }} />
               </TouchableOpacity>
            </Animated.View>
         </RectButton>
      );
   };

   const close = () => {
      swipeableRef.current?.close();
      console.log('Archive action triggered');
   };

   return (
      <Swipeable renderRightActions={renderRightActions} ref={swipeableRef}>
         <View style={styles.container}>
            <Image source={{ uri: item?.img }} style={styles.image} />
            <View style={styles.contentContainer}>
               <Text style={styles.name}>{item.name}</Text>
               <Text style={styles.description}>
                  {item.description ??
                     'Brown the beef better. Lean ground beef – I like to use 85% lean angus. Garlic – use fresh chopped. Spices – chili powder, cumin, onion powder.'}
               </Text>
            </View>
         </View>
      </Swipeable>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#FFFFFF',
   },
   image: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginRight: 10,
   },
   contentContainer: {
      flex: 1,
   },
   name: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
   },
   description: {
      fontSize: 14,
   },
   leftAction: {
      justifyContent: 'center',
      paddingHorizontal: 40,
   },
   actionText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: 'bold',
   },
});

export default SaveFoodItem;
