import React, { useRef } from 'react';
import { View } from 'react-native';
import IconContainer from '../IconContainer';
import MenuOption from './menuOption';
import BottomSheetSlide from './index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Example({ onEndCall, onEndForCall }) {
  const refRBSheet = useRef(null);

  return (
    <BottomSheetSlide
      refRBSheet={refRBSheet}
      child1={
        <IconContainer
          backgroundColor={'red'}
          onPress={() => refRBSheet.current?.open()}
          Icon={() => {
            return <MaterialCommunityIcons name='phone-off' color='white' size={22} />;
          }}
        />
      }
      child2={
        <View>
          <MenuOption
            refRBSheet={refRBSheet}
            onClick={onEndCall}
            txt="End Call"
            icon={<MaterialCommunityIcons name='phone-off' color='white' size={22} />
            }
          />
          <MenuOption
            refRBSheet={refRBSheet}
            onClick={onEndForCall}
            txt="End Call for All"
            icon={<MaterialCommunityIcons name='phone-off' color='white' size={22} />
            }
          />
        </View>
      }
    />
  );
}
