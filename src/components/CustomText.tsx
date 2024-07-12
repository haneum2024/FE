import React from 'react';
import {Text as RNText, TextProps, StyleSheet} from 'react-native';

import color from '../styles/color';

interface CustomTextProps extends TextProps {
  weight?:
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}

const CustomText: React.FC<CustomTextProps> = ({
  style,
  weight = '400',
  ...rest
}) => {
  const getFontFamily = (fontWeight: string) => {
    switch (fontWeight) {
      case '100':
        return 'Pretendard-Thin';
      case '200':
        return 'Pretendard-ExtraLight';
      case '300':
        return 'Pretendard-Light';
      case '400':
        return 'Pretendard-Regular';
      case '500':
        return 'Pretendard-Medium';
      case '600':
        return 'Pretendard-SemiBold';
      case '700':
        return 'Pretendard-Bold';
      case '800':
        return 'Pretendard-ExtraBold';
      case '900':
        return 'Pretendard-Black';
      default:
        return 'Pretendard-Regular';
    }
  };

  const styles = StyleSheet.create({
    text: {
      fontFamily: getFontFamily(weight),
      color: color.gray[950],
    },
  });

  return <RNText style={[styles.text, style]} {...rest} />;
};

export default CustomText;
