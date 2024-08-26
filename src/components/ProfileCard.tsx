import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import SafeMarkIcon from '../img/SafeMarkIcon.svg';
import color from '../styles/color';

import CustomText from './CustomText';
import FemaleIcon from './Icons/FemaleIcon';
import MaleIcon from './Icons/MaleIcon';

const ProfileCard = ({
  ownerName,
  ownerIntroduction,
  ownerProfileImage,
  dogName,
  dogGender,
  dogIntroduction,
  dogProfileImage,
}: {
  ownerName: string;
  ownerIntroduction: string;
  ownerProfileImage: string;
  dogName: string;
  dogGender: string;
  dogIntroduction: string;
  dogProfileImage: string;
}) => {
  const genderIcon =
    dogGender === 'FEMALE' ? (
      <FemaleIcon width={20} height={20} fill={color.orange[400]} />
    ) : (
      <MaleIcon width={20} height={20} fill={color.blue[400]} />
    );

  return (
    <View style={styles.profileContainer}>
      <View style={styles.card}>
        <View>
          <Image source={{uri: ownerProfileImage}} style={styles.image} />
          <View style={styles.mark}>
            <SafeMarkIcon />
            <CustomText weight="500" style={styles.markText}>
              안전 보관
            </CustomText>
          </View>
        </View>

        <CustomText weight="500" style={styles.roleText}>
          주인
        </CustomText>
        <CustomText weight="700" style={styles.nameText}>
          {ownerName}
        </CustomText>
        <CustomText weight="500" style={styles.introText}>
          {ownerIntroduction}
        </CustomText>
      </View>

      <View style={styles.card}>
        <View>
          <Image source={{uri: dogProfileImage}} style={styles.image} />
          <View style={styles.mark}>
            <SafeMarkIcon />
            <CustomText weight="500" style={styles.markText}>
              안전 보관
            </CustomText>
          </View>
        </View>
        <CustomText weight="500" style={styles.roleText}>
          반려견
        </CustomText>
        <View style={styles.dogNameContainer}>
          <CustomText weight="700" style={styles.nameText}>
            {dogName}
          </CustomText>
          {genderIcon}
        </View>
        <CustomText
          weight="500"
          style={styles.introText}
          numberOfLines={2}
          ellipsizeMode="tail">
          {dogIntroduction}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    marginHorizontal: 24,
    marginVertical: 8,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: color.gray[200],
    backgroundColor: color.white,
    overflow: 'hidden',
  },
  mark: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: color.blue[600],
    borderTopRightRadius: 20,
  },
  markText: {
    color: color.white,
    fontSize: 12,
  },
  image: {
    width: '100%',
    aspectRatio: 1.4,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  labelContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  label: {
    backgroundColor: color.blue[600],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  labelText: {
    color: color.white,
    fontSize: 12,
  },
  roleText: {
    color: color.blue[500],
    fontSize: 13,
    marginBottom: 4,
  },
  nameText: {
    color: color.gray[900],
    fontSize: 22,
    marginBottom: 4,
  },
  introText: {
    textAlign: 'center',
    color: color.gray[800],
    fontSize: 13,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  dogNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  genderText: {
    marginLeft: 4,
    fontSize: 18,
    color: color.gray[900],
  },
});

export default ProfileCard;
