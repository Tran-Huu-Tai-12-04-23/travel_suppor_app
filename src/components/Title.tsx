import React, { FC, ReactNode } from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { styleGlobal } from 'src/styles';

interface Props extends RNTextProps {
   children: ReactNode;
   entering?: any;
}

const Title: FC<Props> = ({ entering, children, style, ...rest }) => {
   return (
      <Animated.Text
         entering={entering ? entering : FadeInDown.springify()}
         style={[styleGlobal.title, style]}
         {...rest}
      >
         {children}
      </Animated.Text>
   );
};

export default Title;
