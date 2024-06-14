import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing
} from 'react-native';


export default function App() {

    const positionButton = useRef(new Animated.Value(0)).current;

  const isOnRef= useRef(false);

  const startAnimToOff = () => {
    Animated.timing(positionButton,{
      toValue:0,
      duration:100,
      easing:Easing.ease,
      useNativeDriver:false
    }).start()
  };

  const startAnimToOn = () => {
 Animated.timing(positionButton,{
      toValue:1,
      duration:100,
      easing:Easing.ease,
      useNativeDriver:false
    }).start()

  };

  const positionInterPol = positionButton.interpolate({inputRange:[0,1],outputRange:[0,30]})

  const backgroundColorAnim = positionButton.interpolate({inputRange:[0,1],outputRange:["#767577","#81b0ff"]})

  const initialOpacityOn = positionButton.interpolate({inputRange:[0,1],outputRange:[0,1]})

    const initialOpacityOff = positionButton.interpolate({inputRange:[0,1],outputRange:[1,0]})

  const onPress = () => {
    if (isOnRef.current) {
      startAnimToOff();
      isOnRef.current = false
      // setIsOn(false);
    } else {
      startAnimToOn();
      isOnRef.current = true
      // setIsOn(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{height:30,width:60}}  activeOpacity={0.9} onPress={onPress} >
      <Animated.View style={[styles.mainStyes,{
        backgroundColor:backgroundColorAnim
      }]} >
        <Animated.Text
          style={[
            styles.eahcStyles,
            {
              opacity: initialOpacityOn,
            },
          ]}>
          ON
        </Animated.Text>
        <Animated.Text
          style={[
            styles.eahcStylesOf,
            {
              opacity: initialOpacityOff,
            },
          ]}>
          OFF
        </Animated.Text>
        <Animated.View style={[styles.basicStyle,{
          transform:[{
            translateX:positionInterPol
          }]
        }]} />
          </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  basicStyle: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginTop: 5,
    marginLeft: 5,
  },
  eahcStyles: {
    fontSize: 14,
    color: '#f5dd4b',
    position: 'absolute',
    top: 6,
    left: 5,
  },

  eahcStylesOf: {
    fontSize: 14,
    color: '#f4f3f4',
    position: 'absolute',
    top: 6,
    right: 5,
  },
  mainStyes: {
    borderRadius: 30,
    backgroundColor: '#81b0ff',
    height: 30,
    width: 60,
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
