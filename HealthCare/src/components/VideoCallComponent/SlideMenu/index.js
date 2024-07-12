import React from 'react';
import {View} from 'react-native';
import RBSheet from '@nonam4/react-native-bottom-sheet';

export default function BottomSheetSlide({
  refRBSheet,
  child1,
  child2,
  height = 200,
}) {
  return (
    <View
      style={{
        backgroundColor: '#000',
      }}>
      {child1}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType="slide"
        height={height}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            backgroundColor: '#292929',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        {child2}
      </RBSheet>
    </View>
  );
}
