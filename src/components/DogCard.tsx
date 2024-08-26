import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import SafeMarkIcon from '../img/SafeMarkIcon.svg';
import color from '../styles/color';
import CustomText from './CustomText';
import FemaleIcon from './Icons/FemaleIcon';
import MaleIcon from './Icons/MaleIcon';

const DogCard = ({
  image,
  dogName,
  dogGender,
  dogBreed,
  dogBirth,
}: {
  image: string;
  dogName: string;
  dogGender: string;
  dogBreed: string;
  dogBirth: string;
}) => {
  const isFemale = dogGender === 'FEMALE';

  return (
    <View style={styles.dogCardContainer}>
      <View>
        {image === '' ? (
          <View style={styles.imageBox} />
        ) : (
          <Image source={{uri: image}} style={styles.imageBox} />
        )}
        <View style={styles.mark}>
          <SafeMarkIcon />
          <CustomText weight="500" style={styles.markText}>
            안전 보관 중
          </CustomText>
        </View>
      </View>
      {dogGender && dogName && (
        <View style={styles.mainLine}>
          <CustomText weight="700" style={styles.title}>
            {dogName}
          </CustomText>
          {isFemale ? (
            <FemaleIcon width={20} height={20} fill={color.orange[400]} />
          ) : (
            <MaleIcon width={20} height={20} fill={color.blue[400]} />
          )}
        </View>
      )}
      <View style={styles.line}>
        <CustomText weight="600" style={styles.subTitle}>
          견종
        </CustomText>
        <CustomText weight="500">{dogBreed}</CustomText>
      </View>
      <View style={styles.line}>
        <CustomText weight="600" style={styles.subTitle}>
          생일
        </CustomText>
        <CustomText weight="500">{dogBirth}</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dogCardContainer: {
    padding: 20,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.gray[200],
    borderRadius: 20,
    marginHorizontal: 24,
    marginVertical: 12,
  },
  mainLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  mark: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 10,
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: color.blue[600],
    borderRadius: 90,
  },
  markText: {
    color: color.white,
    fontSize: 12,
  },
  title: {
    fontSize: 22,
    color: color.gray[900],
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
    aspectRatio: 2,
    resizeMode: 'cover',
    backgroundColor: color.gray[100],
    borderRadius: 10,
    marginBottom: 18,
  },
});

export default DogCard;
