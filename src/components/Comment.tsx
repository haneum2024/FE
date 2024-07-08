import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Button} from 'react-native-paper';
import color from '../styles/color';
import CustomText from './CustomText';

const Comment = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (text: string) => {
    setCommentText(text);
    console.log('text:', text);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.commentContainer}>
        <CustomText style={styles.title}>코멘트</CustomText>
        <CustomText style={styles.subTitle}>
          반려견의 건강 상태에 대한 추가적인 관찰 사항, 특별한 주의 사항 등을
          자유롭게 적어주세요.
        </CustomText>
        <TextInput
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
          onPress={() => console.log('기록하기 pressed')}>
          기록하기
        </Button>
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
    marginBottom: 16,
    fontSize: 22,
    fontWeight: 700,
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
});

export default Comment;
