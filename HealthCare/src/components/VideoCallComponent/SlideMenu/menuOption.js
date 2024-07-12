import React from 'react';
import {View, Text, Pressable} from 'react-native';

const MenuOption = ({refRBSheet, onClick, txt, icon}) => {
  return (
    <Pressable
      onPress={() => {
        refRBSheet.current?.close();
        onClick();
      }}>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {icon}
        <Text
          style={{
            paddingHorizontal: 10,
            fontSize: 16,
            color: '#fff',
          }}>
          {txt}
        </Text>
      </View>
    </Pressable>
  );
};

export default MenuOption;
