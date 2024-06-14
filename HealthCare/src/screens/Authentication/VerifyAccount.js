import { Animated, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colorTheme, blackText, blueText, grayText } from '../../constant'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LottieView from 'lottie-react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field'

const CELL_SIZE = 70;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = '#fff';
const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const { Value, Text: AnimatedText } = Animated

const CELL_COUNT = 4;

const animationColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationScale = [...new Array(CELL_COUNT)].map(() => new Value(1));

const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationColor[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    })
  ]).start();
};

export default function Verification({ navigation,route }) {

  const [value, setValue] = useState('')
  const [errormsg, seterrmsg] = useState(null)
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  });

  function handleVerify() {
    const { verify } = route.params;
    `${verify}`===value?navigation.navigate('SuccesfullRegistration'):seterrmsg('OTP Does not match')
  }

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue ? animationScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR]
      })
        : animationColor[index].interpolate({
          inputRange: [0, 1],
          outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        }),
      borderRadius: animationScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1]
          }),
        },
      ],
    };
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused })
    }, 0)

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={(Platform.OS === 'ios') ? 'padding' : null}
      enabled
      keyboardVerticalOffset={Platform.select({ ios: 80, android: 500 })}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.subContainer}>
        <TouchableOpacity
          onPress={() => { navigation.navigate("SignUp") }}
          style={{ width: 40, height: 40, backgroundColor: colorTheme.primaryColor, borderRadius: 10, justifyContent: 'center', alignItems: 'center', }}>
          <MaterialCommunityIcons size={25} name={"arrow-left"} color={"white"} style={{ margin: 2 }} />
        </TouchableOpacity>
        <Text style={[{ fontWeight: 'bold', textAlign: 'center', marginVertical: 20, fontSize: 20, color: colorTheme.primaryColor }]}>Verify Account</Text>
        <LottieView source={require("../../assets/json/success.json")} autoPlay loop style={{ height: 200, }} />
        <Text style={{ textAlign: 'center', marginVertical: 25 }}>
          Please enter the verification number
          we send to your email
        </Text>

        <View>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
          <Text style={{ textAlign: 'left', marginTop: 10 }}>Don't receive a code?<Text style={[{ color: colorTheme.primaryColor, fontSize: 15, fontWeight: 'bold' }]}> Resend</Text></Text>
          {errormsg && <Text style={[styles.smallText,{textAlign:'center',marginTop:10,color:'red'}]}>{errormsg}</Text>}
        </View>
        <TouchableOpacity
          style={{ backgroundColor: colorTheme.primaryColor, borderRadius: 10, justifyContent: 'center', alignItems: "center", marginVertical: 50 }}
          onPress={()=>{handleVerify()}}
        >
          <Text style={[styles.smallText, { color: "white", margin: 14 }]}>Verify</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.appBackGroundColor,

  },
  subContainer: {
    width: "90%",
    height: "auto",
    alignSelf: "center",
    paddingTop: 20
    // backgroundColor:"red"
  },
  bigText: {
    fontSize: blackText.fontSize,
    color: blackText.color,
    fontWeight: blackText.fontWeight
  },
  smallText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  blueText: {
    fontSize: blueText.fontSize,
    color: blueText.color,
    fontWeight: blueText.fontWeight
  },
  textInput: {
    borderRadius: 10,
    backgroundColor: "white",
    padding: 7,
    borderWidth: 1,
    borderColor: "#d3d2d6",
    height: 200,
    textAlignVertical: 'top',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#3759b8',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

})