import React from 'react';
import {View, StyleSheet} from 'react-native';

import color from '../styles/color';
import CustomText from './CustomText';
import DiagnosisIcon from '../img/DiagnosisIcon.svg';

interface DiagnosisProps {
  diagnosis: string;
  borderColor: string;
}

const Diagnosis = ({diagnosis, borderColor}: DiagnosisProps) => {
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
        <CustomText weight="500">{diagnosis}</CustomText>
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
