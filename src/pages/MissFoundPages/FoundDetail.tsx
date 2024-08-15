import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';

import color from '../../styles/color';
import CustomText from '../../components/CustomText';
import BornIcon from '../../components/Icons/BornIcon';

const FoundDetail = () => {
  const image =
    'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-1.png';
  const title = '주인을 찾습니다!!';
  const name = '홍창현';
  const contact = '010-1234-5678으로 연락주세요';
  const foundLocation = '동작구';
  const foundDate = '2023년 12월 23일';
  const foundSituation = '길가다가 우연히 발견';
  const dogBreed = '푸들';
  const dogGender = '수컷';
  const appearance =
    '잘생김 어쩌구저쩌구 어쩌구저쩌구2 어쩌구저쩌구3ㄴㄴㄴㄴㄴㄴㄴㄴ';
  const content =
    '푸들을 찾습니다. 주인분께서 연락주시면 감사하겠습니다.123123';

  return (
    <ScrollView style={styles.detailContainer}>
      <Image source={{uri: image}} style={styles.imageBox} />
      <View style={styles.category}>
        <BornIcon width={20} height={20} fill={color.blue[600]} />
        <CustomText weight="500" style={styles.foundText}>
          유기견 발견
        </CustomText>
      </View>
      <CustomText
        weight="700"
        numberOfLines={2}
        ellipsizeMode="tail"
        style={styles.title}>
        {title}
      </CustomText>
      <View style={styles.subTitleContainer}>
        <CustomText weight="600" style={styles.subTitle}>
          신고자 정보
        </CustomText>
      </View>
      <View style={styles.line}>
        <CustomText weight="600" style={styles.item}>
          이름{'       '}
        </CustomText>
        <CustomText weight="500">{name}</CustomText>
      </View>
      <View style={styles.line}>
        <CustomText weight="600" style={styles.item}>
          연락수단
        </CustomText>
        <CustomText weight="500">{contact}</CustomText>
      </View>

      <View style={styles.subTitleContainer}>
        <CustomText weight="600" style={styles.subTitle}>
          발견 일시 및 장소
        </CustomText>
      </View>
      <View style={styles.line}>
        <CustomText weight="600" style={styles.item}>
          발견 장소
        </CustomText>
        <CustomText weight="500">{foundLocation}</CustomText>
      </View>
      <View style={styles.line}>
        <CustomText weight="600" style={styles.item}>
          발견 일시
        </CustomText>
        <CustomText weight="500">{foundDate}</CustomText>
      </View>
      <View style={styles.line}>
        <CustomText weight="600" style={styles.item}>
          발견 경위
        </CustomText>
        <CustomText weight="500">{foundSituation}</CustomText>
      </View>

      <View style={styles.subTitleContainer}>
        <CustomText weight="600" style={styles.subTitle}>
          유기견 정보
        </CustomText>
      </View>
      <View style={styles.line}>
        <CustomText weight="600" style={styles.item}>
          견종
        </CustomText>
        <CustomText weight="500">{dogBreed}</CustomText>
      </View>
      <View style={styles.line}>
        <CustomText weight="600" style={styles.item}>
          성별
        </CustomText>
        <CustomText weight="500">{dogGender}</CustomText>
      </View>
      <View style={styles.line}>
        <CustomText weight="600" style={styles.item}>
          외형
        </CustomText>
        <CustomText weight="500">{appearance}</CustomText>
      </View>
      <View style={styles.line}>
        <CustomText weight="600" style={styles.item}>
          기타
        </CustomText>
        <CustomText weight="500">{content}</CustomText>
      </View>
      <View style={styles.blank} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    paddingHorizontal: 28,
    backgroundColor: color.white,
  },
  imageBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 160,
    backgroundColor: color.gray[100],
    marginTop: 32,
    marginBottom: 24,
    borderRadius: 10,
  },
  category: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  foundText: {
    fontSize: 14,
    color: color.blue[600],
  },
  title: {
    fontSize: 24,
    color: color.gray[950],
    marginBottom: 6,
  },
  subTitleContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 24,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: color.blue[100],
  },
  subTitle: {
    fontSize: 16,
    color: color.gray[950],
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 6,
  },
  item: {
    fontSize: 13,
    color: color.blue[500],
  },
  blank: {
    height: 60,
  },
});

export default FoundDetail;
