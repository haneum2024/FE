import React, {useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import Modal from 'react-native-modal';

import color from '../../styles/color';
import CustomText from '../../components/CustomText';
import BornIcon from '../../components/Icons/BornIcon';
import LeftArrowIcon from '../../img/LeftArrowIcon.svg';
import RightArrowIcon from '../../img/RightArrowIcon.svg';
import CloseIcon from '../../img/CloseIcon.svg';
import type {ReportDogPageNavigation} from '../../../types/navigation';

type FoundNavigationProp = StackNavigationProp<
  ReportDogPageNavigation,
  'FoundResultSuccess'
>;

const FoundResultSuccess = () => {
  const navigation = useNavigation<FoundNavigationProp>();
  const [foundTipModalOpen, setFoundTipModalOpen] = useState(false);

  const moveToMainPage = () => {
    navigation.navigate('MissFoundMain', {routeName: 'Found'});
  };

  const copyNumber = () => {
    Clipboard.setString(contact);
  };

  const modalOpen = () => {
    setFoundTipModalOpen(true);
  };

  const modalClose = () => {
    setFoundTipModalOpen(false);
  };

  const name = '김철수';
  const contact = '010-1234-5678';

  return (
    <View style={styles.foundSuccessContainer}>
      <TouchableOpacity
        style={styles.homeBox}
        onPress={moveToMainPage}
        activeOpacity={0.8}>
        <LeftArrowIcon width={15} height={15} fill={color.blue[600]} />
        <CustomText weight="500" style={styles.homeText}>
          홈으로
        </CustomText>
      </TouchableOpacity>
      <View style={styles.contentBox}>
        <View style={styles.category}>
          <BornIcon width={20} height={20} fill={color.blue[600]} />
          <CustomText weight="500" style={styles.foundText}>
            발견 알리기
          </CustomText>
        </View>
        <CustomText weight="600" style={styles.contentText}>
          유실견의 보호자에게 연락을 취해주세요.
        </CustomText>
        <View style={styles.infoContainer}>
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
        </View>
      </View>
      <View style={styles.bottomContent}>
        <Button mode="contained" style={styles.button} onPress={copyNumber}>
          전화번호 복사하기
        </Button>
        <TouchableOpacity
          style={styles.foundTip}
          onPress={modalOpen}
          activeOpacity={0.8}>
          <CustomText weight="500" style={styles.foundTipText}>
            발견을 알리는 팁
          </CustomText>
          <RightArrowIcon width={15} height={15} fill={color.gray[500]} />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={foundTipModalOpen}
        onBackdropPress={modalClose}
        onBackButtonPress={modalClose}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        backdropOpacity={0.3}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.mainTitleContainer}>
            <CustomText weight="500" style={styles.mainTitle}>
              발견을 알리는 팁
            </CustomText>
            <TouchableOpacity onPress={modalClose} activeOpacity={0.8}>
              <CloseIcon width={15} height={15} fill={color.gray[600]} />
            </TouchableOpacity>
          </View>
          <View style={styles.subTitleContainer}>
            <CustomText weight="600" style={styles.subTitle}>
              1. 자신의 신원 밝히기
            </CustomText>
          </View>
          <CustomText weight="500" style={styles.subTitleText}>
            누구인지, 그리고 왜 연락했는지를 간단하고 명확하게 설명해주세요.
          </CustomText>
          <CustomText weight="500" style={styles.exampleText}>
            ex. 저는 [홍길동]이고, 오늘 [발견한 날짜]에 [발견한 장소]에서
            유실견을 발견했습니다.
          </CustomText>
          <View style={styles.subTitleContainer}>
            <CustomText weight="600" style={styles.subTitle}>
              2. 유실견의 상태 설명
            </CustomText>
          </View>
          <CustomText weight="500" style={styles.subTitleFirstText}>
            유실견의 현재 상태와 건강 상태를 설명하세요.
          </CustomText>
          <CustomText weight="500" style={styles.subTitleText}>
            만약 동물병원에 데려갔다면 그 정보도 포함하세요.
          </CustomText>
          <CustomText weight="500" style={styles.exampleText}>
            ex. 강아지는 지금 [위치]에 있으며, 건강 상태는 좋아 보여요. 필요한
            경우 가까운 동물병원에 데려갈 수 있어요.
          </CustomText>
          <View style={styles.subTitleContainer}>
            <CustomText weight="600" style={styles.subTitle}>
              3. 다음 단계 논의
            </CustomText>
          </View>
          <CustomText weight="500" style={styles.subTitleText}>
            유실견을 돌려주는 방법과 장소를 주인과 협의하세요.
          </CustomText>
          <CustomText weight="500" style={styles.exampleText}>
            ex. 언제 어디서 유실견을 데려가실 수 있을지 말씀해주시면 그에 맞춰
            준비하겠습니다.
          </CustomText>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  foundSuccessContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: color.gray[50],
  },
  homeBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 24,
    gap: 10,
  },
  homeText: {
    fontSize: 12,
    color: color.blue[600],
  },
  contentBox: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: color.gray[200],
    backgroundColor: color.white,
    shadowColor: color.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
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
    borderRadius: 8,
    gap: 6,
    backgroundColor: color.blue[50],
  },
  mainTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 13,
    color: color.gray[800],
  },
  subTitleContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: color.blue[50],
  },
  subTitle: {
    fontSize: 14,
    color: color.gray[950],
  },
  subTitleFirstText: {
    fontSize: 13,
    color: color.gray[800],
    lineHeight: 18,
  },
  subTitleText: {
    fontSize: 13,
    color: color.gray[800],
    lineHeight: 18,
    marginBottom: 6,
  },
  exampleText: {
    fontSize: 10,
    color: color.gray[500],
    marginBottom: 12,
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
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
  foundTip: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.gray[200],
    backgroundColor: color.white,
  },
  foundTipText: {
    fontSize: 13,
    color: color.gray[900],
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: color.white,
  },
  modalText: {
    fontSize: 16,
    color: color.gray[900],
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default FoundResultSuccess;
