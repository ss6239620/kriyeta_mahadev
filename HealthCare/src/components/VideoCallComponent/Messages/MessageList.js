import React, {useRef} from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';

const MessagesList = ({messages}) => {
  const scrollView = useRef();

  const isOnLeft = (type, isLeft) => {
    if (isLeft && type === 'messageContainer') {
      return {
        alignSelf: 'flex-start',
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 0,
      };
    } else if (isLeft && type === 'message') {
      return {
        color: '#000',
      };
    } else {
      return {
        borderTopRightRadius: 0,
      };
    }
  };

  return (
    <ScrollView
      style={{backgroundColor: '#fff', flex: 1}}
      ref={ref => (scrollView.current = ref)}
      onContentChange={() => {
        scrollView.current.scrollToEnd({animated: true});
      }}>
      {messages.map((message, index) => {
        const isLeft = message.isLeft;
        return (
          <View
            key={index}
            style={[
              styles.messageContainer,
              isOnLeft('messageContainer', isLeft),
            ]}>
            <View style={styles.messageView}>
              <Text style={[styles.message, isOnLeft('message', isLeft)]}>
                {message.name}
              </Text>
              <Text style={[styles.message, isOnLeft('message', isLeft)]}>
                {message.content}
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 5,
  },
  messageContainer: {
    backgroundColor: '#292929',
    maxWidth: '80%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '80%',
  },
  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  message: {
    color: 'white',
    alignSelf: 'flex-start',
    fontSize: 15,
  },
  time: {
    color: 'lightgray',
    alignSelf: 'flex-end',
    fontSize: 10,
  },
});

export default MessagesList;
