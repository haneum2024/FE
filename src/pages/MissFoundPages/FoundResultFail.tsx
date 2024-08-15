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
  'FoundResultFail'
>;

const FoundResultFail = () => {
  const navigation = useNavigation<FoundNavigationProp>();

  const moveToPostPage = () => {
    navigation.navigate('FoundPost');
  };

  return (
    <View style={styles.foundFailContainer}>
      <View style={styles.contentBox}>
        <View style={styles.category}>
          <BornIcon width={20} height={20} fill={color.blue[600]} />
          <CustomText weight="500" style={styles.foundText}>
            유기견 발견
          </CustomText>
        </View>
        <CustomText weight="600" style={styles.contentText}>
          해당 유기견에 대응하는 비문 정보를 찾지 못했어요.
        </CustomText>
      </View>
      <View style={styles.bottomContent}>
        <Button mode="contained" style={styles.button} onPress={moveToPostPage}>
          발견 신고 작성하기
        </Button>
        <View style={styles.tooltip}>
          <CustomText style={styles.tooltipText}>
            약 1분밖에 안 걸려요!
          </CustomText>
        </View>
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

export default FoundResultFail;
