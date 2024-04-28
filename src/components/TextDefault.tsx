import React, { FC, ReactNode } from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { styleGlobal } from 'src/styles';

interface Props extends RNTextProps {
   children: ReactNode;
   bold?: boolean;
   entering?: any;
}

const TextDefault: FC<Props> = ({ entering, children, style, bold, ...rest }) => {
   return (
      <Animated.Text
         entering={entering ? entering : FadeInDown.springify()}
         style={[styleGlobal.text, { fontWeight: bold ? '800' : 'normal' }, style]}
         {...rest}
      >
         {children}
      </Animated.Text>
   );
};

export default TextDefault;
