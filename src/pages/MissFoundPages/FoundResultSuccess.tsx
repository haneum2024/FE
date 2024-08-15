import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';

import color from '../../styles/color';
import CustomText from '../../components/CustomText';
import BornIcon from '../../components/Icons/BornIcon';
import type {ReportDogPageNavigation} from '../../../types/navigation';

type FoundNavigationProp = StackNavigationProp<
  ReportDogPageNavigation,
  'FoundResultSuccess'
>;

const FoundResultSuccess = () => {
  const navigation = useNavigation<FoundNavigationProp>();

  const moveToMainPage = () => {
    navigation.navigate('MissFoundMain');
  };

  const name = '김철수';
  const contact = '010-1234-5678로 전화주세요';

  return (
    <View style={styles.foundFailContainer}>
      <View style={styles.contentBox}>
        <View style={styles.category}>
          <BornIcon width={20} height={20} fill={color.blue[600]} />
          <CustomText weight="500" style={styles.foundText}>
            발견 알리기
          </CustomText>
        </View>
        <CustomText weight="600" style={styles.contentText}>
          유기견의 보호자에게 연락을 취해주세요.
        </CustomText>
        <View style={styles.infoContainer}>
          <View style={styles.line}>
            <CustomText weight="600" style={styles.item}>
              이름{'        '}
            </CustomText>
            <CustomText weight="500">{name}</CustomText>
          </View>
          <View style={styles.line}>
            <CustomText weight="600" style={styles.item}>
              연락 수단
            </CustomText>
            <CustomText weight="500">{contact}</CustomText>
          </View>
        </View>
      </View>
      <View style={styles.bottomContent}>
        <Button mode="contained" style={styles.button} onPress={moveToMainPage}>
          메인으로 이동
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  foundFailContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  contentBox: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: color.gray[200],
    backgroundColor: color.white,
    elevation: 5,
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
  contentText: {
    fontSize: 16,
    color: color.gray[950],
  },
  infoContainer: {
    marginTop: 16,
    padding: 10,
    backgroundColor: color.blue[50],
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
  button: {
    width: Dimensions.get('window').width - 48,
    borderRadius: 8,
    marginVertical: 16,
    paddingVertical: 6,
    color: color.white,
    backgroundColor: color.blue[600],
  },
  bottomContent: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 70,
  },
  tooltip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: color.blue[100],
  },
  tooltipText: {
    fontSize: 10,
    color: color.blue[600],
  },
});

export default FoundResultSuccess;
