import React, { useRef } from 'react';
import { View } from 'react-native';
import IconContainer from '../IconContainer';
import MenuOption from './menuOption';
import BottomSheetSlide from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Example({
  onCameraSwitch,
  onShareScreen,
  onChatClick,
  onAddParticipantClick,
}) {
  const refRBSheet = useRef(null);

  return (
    <BottomSheetSlide
      refRBSheet={refRBSheet}
      child1={
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          backgroundColor={'transparent'}
          onPress={() => refRBSheet.current?.open()}
          Icon={() => {
            return <MaterialCommunityIcons name='dots-vertical' color='white' size={22} />

          }}
        />
      }
      child2={
        <View>
          <MenuOption
            refRBSheet={refRBSheet}
            onClick={onCameraSwitch}
            txt="Switch Camera"
            icon={<MaterialCommunityIcons name='camera-flip-outline' color='white' size={22} />}
          />
          <MenuOption
            refRBSheet={refRBSheet}
            onClick={onShareScreen}
            txt="Share Screen"
            icon={<MaterialCommunityIcons name='projector-screen' color='white' size={22} />}
          />
          <MenuOption
            refRBSheet={refRBSheet}
            onClick={onChatClick}
            txt="Chat"
            icon={<MaterialCommunityIcons name='chat' color='white' size={22} />}
          />
          <MenuOption
            refRBSheet={refRBSheet}
            onClick={onAddParticipantClick}
            txt="Add Participant"
            icon={<MaterialCommunityIcons name='account' color='white' size={22} />}
          />
        </View>
      }
      height={250}
    />
  );
}
