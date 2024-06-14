import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colorTheme, grayText, blackText } from '../../constant';
import Header from '../../components/Header';
import { mlservices } from '../../services/AIML';
import LottieView from 'lottie-react-native'

export default function Message() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  function MessageBox({ message, loading }) {
    return (
      <>
        <View style={[styles.subContainer, { marginTop: 15 }]}>
          <View style={{ width: "85%", alignSelf: message.isUser ? "flex-end" : null }}>
            <View style={{ backgroundColor: message.isUser ? colorTheme.primaryColor : "white", elevation: 2, marginBottom: 2, borderRadius: 10, flexWrap: 'wrap' }}>
              <View style={{ margin: 10 }}>
                <Text style={{ color: message.isUser ? "white" : "black" }}>
                  {message.text}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require('../../assets/img/health.jpg')} resizeMode='contain' style={[styles.image, { width: 25, height: 25, marginRight: 5 }]} />
                <Text>{message.isUser ? 'You' : 'ChatBot'}</Text>
              </View>
            </View>
          </View>
        </View>
        {loading && message.isUser ? (
          <LottieView
            source={require('../../assets/json/bot-think.json')}
            autoPlay
            loop
            style={{ width: 90, height: 90 }}
          />
        ) : (<Text>{null}</Text>
        )}
      </>
    );
  }

  function removeStarsFromString(inputString) {
    // Replace all occurrences of '* ' with an empty string
    return inputString.replace(/\* /g, '');
  }

  function handleSend() {
    setInput('');
    const newMessage = { text: input, isUser: true };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    mlservices.ChatBot(input).then(
      res => {
        const stringWithoutStars = removeStarsFromString(res.data);
        const botResponse = { text: stringWithoutStars, isUser: false };
        console.log(botResponse);
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.subContainer, { marginBottom: 15 }]}>
        <Header leftIconName header={'ChatBot'} textColor={'white'} titleMargin={30} />
      </View>
      <View style={styles.chatContainer}>
        <ScrollView>
          <Text style={[styles.bigText, { margin: 10, textAlign: "center", color: grayText.color }]}>Today</Text>
          {messages.map((message, index) => (
            <MessageBox key={index} message={message} loading={index === messages.length - 1 && message.isUser} />
          ))}
        </ScrollView>
        <View style={styles.textInput}>
          <MaterialIcons name="mic" color={colorTheme.primaryColor} size={25} />
          <TextInput
            placeholder='Type Message here..'
            onChangeText={setInput}
            value={input}
            style={{ width: "80%" }}
            multiline
          />
          <MaterialIcons name="send" color={colorTheme.primaryColor} size={25} style={{ marginRight: 5 }} onPress={handleSend} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.primaryColor
  },
  subContainer: {
    width: "90%",
    alignSelf: 'center'
  },
  chatContainer: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'white',
    paddingBottom: 60,
    paddingTop: 15,
  },
  bigText: {
    fontSize: blackText.fontSize,
    color: blackText.color,
    fontWeight: blackText.fontWeight
  },
  textInput: {
    borderRadius: 10,
    backgroundColor: "white",
    padding: 0,
    borderWidth: 1,
    borderColor: colorTheme.borderColor,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colorTheme.borderColor,
    marginRight: 10,
    backgroundColor: "white"
  },
});
