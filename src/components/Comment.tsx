import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Button, Portal, Snackbar} from 'react-native-paper';
import color from '../styles/color';
import CustomText from './CustomText';

const Comment = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [visible, setVisible] = useState(false);

  const handleCommentChange = (text: string) => {
    setCommentText(text);
    console.log('text:', text);
  };

  const handleEditMode = () => {
    setIsEditMode(true);
    console.log('수정하기 pressed');
  };

  const submitComment = () => {
    setVisible(true);
    setIsFocused(false);
    setIsEditMode(false);
    console.log('코멘트 작성 완료');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.commentContainer}>
        <View style={styles.titleContainer}>
          <CustomText style={styles.title}>코멘트</CustomText>
          {!isEditMode && (
            <TouchableOpacity style={styles.changeBox} onPress={handleEditMode}>
              <CustomText style={styles.change}>수정</CustomText>
            </TouchableOpacity>
          )}
        </View>
        {isEditMode && (
          <CustomText style={styles.subTitle}>
            반려견의 건강 상태에 대한 추가적인 관찰 사항, 특별한 주의 사항 등을
            자유롭게 적어주세요.
          </CustomText>
        )}
        {isEditMode ? (
          <TextInput
            value={commentText}
            placeholder="코멘트를 적어주세요."
            editable={true}
            multiline={true}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={handleCommentChange}
            style={[
              styles.textInput,
              {borderColor: isFocused ? color.blue[600] : color.gray[200]},
            ]}
            placeholderTextColor={color.gray[300]}
          />
        ) : (
          <View style={styles.commentBox}>
            <CustomText>{commentText}</CustomText>
          </View>
        )}
        {isEditMode && (
          <Button
            mode="contained"
            disabled={commentText.length === 0}
            style={[
              styles.button,
              {
                backgroundColor:
                  commentText.length > 0 ? color.blue[600] : color.gray[100],
              },
            ]}
            onPress={submitComment}>
            기록하기
          </Button>
        )}
        <Portal>
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            action={{
              label: '확인',
              onPress: () => {
                setVisible(false);
              },
              labelStyle: {color: color.white},
            }}
            duration={3000}
            style={styles.snackbarContainer}>
            코멘트 작성 완료!
          </Snackbar>
        </Portal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    padding: 16,
    backgroundColor: color.white,
    borderWidth: 2,
    borderColor: color.gray[200],
    borderRadius: 10,
    marginHorizontal: 24,
    marginVertical: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  changeBox: {
    display: 'flex',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: color.gray[200],
    backgroundColor: color.gray[50],
  },
  change: {
    fontSize: 12,
    fontWeight: 500,
    color: color.gray[600],
  },
  subTitle: {
    marginBottom: 16,
    fontSize: 13,
    fontWeight: 500,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: color.white,
  },
  button: {
    borderRadius: 8,
    marginTop: 16,
    color: color.white,
  },
  commentBox: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 13,
    color: color.gray[800],
    backgroundColor: color.blue[50],
    borderRadius: 10,
  },
  snackbarContainer: {
    backgroundColor: color.blue[900],
    borderRadius: 8,
  },
});

export default Comment;
