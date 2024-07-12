import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';

import color from '../styles/color';
import CustomText from './CustomText';
import DiagnosisIcon from '../img/DiagnosisIcon.svg';

interface DiagnosisProps {
  type: string;
  borderColor: string;
}

const Diagnosis = ({type, borderColor}: DiagnosisProps) => {
  const dignosisDescription = useMemo(() => {
    let description = '';
    if (type === '좋음') {
      description =
        '건강 상태가 매우 양호해요. 현재 상태를 유지하면서 주기적인 운동과 균형 잡힌 식단을 제공해주세요. 예방적인 차원에서 정기 검진을 받는 것도 좋아요.';
    } else if (type === '보통') {
      description =
        '건강 상태가 대체로 좋아요. 약간의 주의가 필요할 수 있지만, 큰 문제는 없어보여요. 지속적인 모니터링과 함께 건강한 생활 습관을 유지해주세요.';
    } else if (type === '주의') {
      description =
        '몇 가지 주의해야 할 점들이 있어요. 밥을 잘 먹지 않거나, 무기력함이 지속되면 추가 검진을 받아보는 것이 좋아요. 현재 상태를 꾸준히 모니터링하고, 건강 상태가 더 나빠지지 않도록 신경 써주세요.';
    } else if (type === '경계') {
      description =
        '여러 건강 문제들이 나타나고 있어요. 특히 구토, 기침, 잇몸색 변화 등의 증상이 지속된다면 즉시 동물 병원에 방문해 정밀 검사를 받아보는 것이 필요해요. 평소보다 더욱 세심하게 돌봐주세요.';
    } else {
      description =
        '건강 상태가 매우 우려돼요. 대부분의 항목에서 문제가 발견되었으므로, 즉시 전문 수의사의 진료를 받아야 해요. 강아지의 건강을 신속하게 회복시키기 위해 필요한 모든 조치를 취해주세요.';
    }
    return description;
  }, [type]);

  return (
    <View style={[styles.diagnosisContainer, {borderColor}]}>
      <View style={styles.iconBox}>
        <DiagnosisIcon width={60} height={40} />
        <CustomText weight="700" style={styles.subTitle}>
          진단서
        </CustomText>
      </View>
      <View style={styles.columnLine} />
      <View style={styles.description}>
        <CustomText weight="500">{dignosisDescription}</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  diagnosisContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    color: color.gray[700],
    fontSize: 13,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 12,
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
  },
  subTitle: {
    color: color.blue[600],
    fontSize: 13,
  },
  columnLine: {
    width: 1,
    height: '100%',
    marginRight: 10,
    marginLeft: 4,
    backgroundColor: color.gray[200],
  },
  description: {
    flex: 1,
    fontSize: 13,
    color: color.gray[700],
  },
});

export default Diagnosis;
