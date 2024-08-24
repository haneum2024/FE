import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';

import {getCommentApi, postCommentApi} from '../api/commentApi';
import {getAccessToken} from '../storage/auth';
import color from '../styles/color';
import CustomText from './CustomText';

const Comment = ({
  date,
  handleMessage,
}: {
  date: string;
  handleMessage: (text: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (text: string) => {
    setCommentText(text);
  };

  const handleEditMode = () => {
    setIsEditMode(true);
  };

  const submitComment = async () => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();
      await postCommentApi({
        accessToken: accessToken as string,
        date: date,
        comment: commentText,
      });
      setIsLoading(false);
      handleMessage('코멘트 작성 완료!');
      setIsFocused(false);
      setIsEditMode(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchComment = async () => {
      const accessToken = await getAccessToken();
      const comment = await getCommentApi({
        accessToken: accessToken as string,
        date: date,
      });
      const commentData = comment.data;

      if (commentData) {
        setCommentText(commentData.comment);
        setIsEditMode(false);
      } else {
        setCommentText('');
        setIsEditMode(true);
      }
    };
    if (date !== '') {
      fetchComment();
    }
  }, [date]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.commentContainer}>
        <View style={styles.titleContainer}>
          <CustomText weight="700" style={styles.title}>
            코멘트
          </CustomText>
          {!isEditMode && (
            <TouchableOpacity style={styles.changeBox} onPress={handleEditMode}>
              <CustomText weight="500" style={styles.change}>
                수정
              </CustomText>
            </TouchableOpacity>
          )}
        </View>
        {isEditMode && (
          <CustomText weight="500" style={styles.subTitle}>
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
              {borderColor: isFocused ? color.blue[300] : color.gray[200]},
            ]}
            placeholderTextColor={color.gray[300]}
          />
        ) : (
          <View style={styles.commentBox}>
            <CustomText weight="500">{commentText}</CustomText>
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
            {isLoading ? (
              <ActivityIndicator size={25} color={color.white} />
            ) : (
              '기록하기'
            )}
          </Button>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    padding: 16,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.gray[200],
    borderRadius: 10,
    marginHorizontal: 24,
    marginVertical: 8,
  },
  title: {
    fontSize: 22,
    color: color.gray[900],
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
    color: color.gray[600],
  },
  subTitle: {
    marginBottom: 16,
    fontSize: 13,
  },
  textInput: {
    padding: 10,
    borderWidth: 2,
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
});

export default Comment;
