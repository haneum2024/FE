import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import color from '../styles/color';
import CustomText from './CustomText';
import {Divider} from 'react-native-paper';
import type {MissDogPageNavigation} from '../../types/navigation';

type MissDogProp = StackNavigationProp<MissDogPageNavigation, 'MissDetail'>;

const MissCard = ({
  image,
  title,
  dogGender,
  dogBreed,
  dogAge,
  missingLocation,
  missingDate,
}: {
  image: string;
  title: string;
  dogGender: string;
  dogBreed: string;
  dogAge: number;
  missingLocation: string;
  missingDate: string;
}) => {
  const navigation = useNavigation<MissDogProp>();

  const moveToDetailPage = () => {
    navigation.navigate('MissDetail');
  };
  return (
    <TouchableOpacity onPress={moveToDetailPage} activeOpacity={0.8}>
      <View style={styles.foundContainer}>
        <Image source={{uri: image}} style={styles.imageBox} />
        <CustomText weight="700" style={styles.title}>
          {title}
        </CustomText>
        <View style={styles.line}>
          <CustomText weight="600" style={styles.subTitle}>
            견종
          </CustomText>
          <CustomText weight="500">{dogBreed}</CustomText>
        </View>
        <View style={styles.dogInfo}>
          <View style={styles.line}>
            <CustomText weight="600" style={styles.subTitle}>
              성별
            </CustomText>
            <CustomText weight="500">{dogGender}</CustomText>
          </View>
          <View style={styles.line}>
            <CustomText weight="600" style={styles.subTitle}>
              나이
            </CustomText>
            <CustomText weight="500">{dogAge}살</CustomText>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.line}>
          <CustomText weight="600" style={styles.subTitle}>
            실종 지역
          </CustomText>
          <CustomText weight="500">{missingLocation}</CustomText>
        </View>
        <View style={styles.line}>
          <CustomText weight="600" style={styles.subTitle}>
            실종 날짜
          </CustomText>
          <CustomText weight="500">{missingDate}</CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  foundContainer: {
    padding: 20,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.gray[200],
    borderRadius: 20,
    marginHorizontal: 24,
    marginVertical: 12,
  },
  title: {
    fontSize: 22,
    color: color.gray[900],
    marginVertical: 12,
  },
  subTitle: {
    fontSize: 13,
    color: color.blue[500],
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  imageBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 140,
    backgroundColor: color.gray[100],
    borderRadius: 10,
  },
  dogInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  divider: {
    marginVertical: 8,
    color: color.gray[100],
  },
});

export default MissCard;
