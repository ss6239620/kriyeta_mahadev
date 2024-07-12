import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';

/*
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
*/
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const ChatInput = ({onSendIconClick}) => {
  const [message, setMessage] = useState('');
  // const height = useSharedValue(70);

  /*
  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });
  */

  const onMsgSend = () => {
    onSendIconClick(message);
    setMessage('');
  };

  return (
    <View style={styles.innerContainer}>
      <View style={styles.inputAndMicrophone}>
        <TextInput
          multiline
          placeholder={'Type something...'}
          style={styles.input}
          value={message}
          onChangeText={text => setMessage(text)}
        />
      </View>
      <TouchableOpacity style={styles.sendButton} onPress={onMsgSend}>
      <MaterialCommunityIcons name='send' color='white' size={22} />
      </TouchableOpacity>
    </View>
  );
  /*
  return (
    <Animated.View style={[styles.container, heightAnimatedStyle]}>
      <View style={styles.innerContainer}>
        <View style={styles.inputAndMicrophone}>
          <TextInput
            multiline
            placeholder={'Type something...'}
            style={styles.input}
            value={message}
            onChangeText={text => setMessage(text)}
          />
        </View>
        <TouchableOpacity style={styles.sendButton}>
          <SendIcon width="30" height="30" fill="#000" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
  */
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  replyContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  innerContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  inputAndMicrophone: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    flex: 3,
    marginRight: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'transparent',
    paddingLeft: 20,
    color: '#000',
    flex: 3,
    fontSize: 15,
    height: 50,
    alignSelf: 'center',
  },
  sendButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatInput;
