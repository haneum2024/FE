import React from 'react';
import {View, StyleSheet} from 'react-native';

import color from '../styles/color';
import CustomText from './CustomText';

const AddInfoTitle = ({
  icon,
  title,
  page,
}: {
  icon: React.ReactNode;
  title: string;
  page?: string;
}) => {
  return (
    <View style={styles.addInfoTitleContainer}>
      {icon}
      <CustomText weight="700" style={styles.title}>
        {title}
      </CustomText>
      <CustomText weight="600" style={styles.text}>
        {page}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  addInfoTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    color: color.black,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: color.blue[600],
  },
});

export default AddInfoTitle;
