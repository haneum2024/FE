import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {RouteProp} from '@react-navigation/native';

import color from '../../styles/color';
import CustomText from '../../components/CustomText';
import BornIcon from '../../components/Icons/BornIcon';
import {getAccessToken} from '../../storage/auth';
import {getDetailMissApi} from '../../api/petSearchApi';
import type {MissDogPageNavigation} from '../../../types/navigation';

interface MissDetailProps {
  route: RouteProp<MissDogPageNavigation, 'MissDetail'>;
}

const MissDetail = ({route}: MissDetailProps) => {
  const id = route.params.id;

  const [missDetail, setMissDetail] = useState<any>(null);

  useEffect(() => {
    const fetchMissDetail = async () => {
      const accessToken = await getAccessToken();
      const missdetail = await getDetailMissApi({
        accessToken: accessToken as string,
        petSearchBoardId: id,
      });
      setMissDetail(missdetail.data);
    };

    fetchMissDetail();
  }, [id]);

  if (!missDetail) {
    return (
      <View style={styles.loadingContainer}>
        <CustomText>Loading...</CustomText>
      </View>
    );
  }

  const image = missDetail.imageUrlList[0];
  const title = missDetail.title;
  const name = missDetail.name;
  const contact = missDetail.contact;
  const missLocation = missDetail.specificLocation;
  const missDate = missDetail.lostDateTime;
  const missSituation = missDetail.situation;
  const dogBreed = missDetail.petBreed;
  const dogGender = missDetail.petGender === 'FEMALE' ? '암컷' : '수컷';
  const dogAge = missDetail.age;
  const appearance = missDetail.petDescription;
  const content = missDetail.content;

  return (
    <ScrollView style={styles.detailContainer}>
      <Image source={{uri: image}} style={styles.imageBox} />
      <View style={styles.category}>
        <BornIcon width={20} height={20} fill={color.blue[600]} />
        <CustomText weight="500" style={styles.foundText}>
          반려견 실종
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
          이름{'    '}
        </CustomText>
        <CustomText weight="500">{name}</CustomText>
      </View>
      <View style={styles.line}>
        <CustomText weight="600" style={styles.item}>
          연락처
        </CustomText>
        <CustomText weight="500">{contact}</CustomText>
      </View>

      <View style={styles.subTitleContainer}>
        <CustomText weight="600" style={styles.subTitle}>
          실종 일시 및 장소
        </CustomText>
      </View>
      <View style={styles.line}>
        <CustomText weight="600" style={styles.item}>
          실종 장소
        </CustomText>
        <CustomText weight="500">{missLocation}</CustomText>
      </View>
      <View style={styles.line}>
        <CustomText weight="600" style={styles.item}>
          실종 일시
        </CustomText>
        <CustomText weight="500">{missDate}</CustomText>
      </View>
      <View style={styles.line}>
        <CustomText weight="600" style={styles.item}>
          실종 경위
        </CustomText>
        <CustomText weight="500">{missSituation}</CustomText>
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
          나이
        </CustomText>
        <CustomText weight="500">{dogAge}살</CustomText>
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
    backgroundColor: color.blue[50],
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
  },
});

export default MissDetail;
