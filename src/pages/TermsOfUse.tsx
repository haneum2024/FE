import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {login} from '../store/reducers/authReducer';

import NoticeIcon from '../img/NoticeIcon.svg';
import {Button, Checkbox} from 'react-native-paper';
import color from '../styles/color';
import CustomText from '../components/CustomText';
import CollapsibleView from '../components/CollapsibleView';
import TermsOfUseText from '../components/TermsOfUseText';

const TermsOfUse = () => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [checkDisabled, setCheckDisabled] = useState(true);

  const agreeTermsOfUse = () => {
    setChecked(!checked);
  };

  const termsOfUseApi = () => {
    // 이용약관 동의 api로직

    dispatch(login());
  };

  const handleCollapse = (disable: boolean) => {
    setCheckDisabled(disable);
  };

  const introductionText = `해피마루에 어서오세요!
서비스를 이용하기 위해 이용약관 동의가 필요해요.`;

  return (
    <View style={styles.termsOfUseContainer}>
      <View style={styles.termsOfUseBox}>
        <NoticeIcon width={50} height={50} />
        <CustomText style={styles.title}>이용약관 동의</CustomText>
        <CustomText style={styles.label}>{introductionText}</CustomText>
        <CollapsibleView
          title={'이용약관 전문 확인하기'}
          children={<TermsOfUseText />}
          height={300}
          onPress={handleCollapse}
        />
      </View>
      <View style={styles.startBox}>
        <View style={styles.agreeBox}>
          <Checkbox
            disabled={checkDisabled}
            status={checked ? 'checked' : 'unchecked'}
            onPress={agreeTermsOfUse}
            color={color.blue[600]}
          />
          <CustomText
            style={{color: checkDisabled ? color.gray[300] : color.gray[700]}}>
            위의 이용약관에 동의합니다
          </CustomText>
        </View>
        <Button
          mode="contained"
          disabled={!checked}
          style={[
            styles.button,
            {
              backgroundColor: checked ? color.blue[600] : color.gray[100],
            },
          ]}
          onPress={termsOfUseApi}>
          시작하기
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  termsOfUseContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 77,
    paddingBottom: 68,
    paddingHorizontal: 24,
    backgroundColor: color.white,
  },
  termsOfUseBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 18,
  },
  startBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  agreeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
  },
  label: {
    fontSize: 13,
    color: color.gray[700],
  },
  button: {
    borderRadius: 8,
    marginTop: 16,
    color: color.white,
  },
});

export default TermsOfUse;
