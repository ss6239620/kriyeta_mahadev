import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import VerticalDots from '../../asset/VerticalDots';

const ChatHeader = ({picture, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onPress}>
        <MaterialCommunityIcons name='arrow-left' color='white' size={22} />
      </TouchableOpacity>
      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.profile}>
          {/*<Image style={styles.image} source={{uri: picture}} /> */}
          <View style={styles.usernameAndOnlineStatus}>
            <Text style={styles.username}>Chat Area</Text>
          </View>
        </TouchableOpacity>
        {/*
        <View style={styles.options}>
          <TouchableOpacity style={{paddingHorizontal: 20}}>
            <VerticalDots height={24} width={24} fill="#000" />
          </TouchableOpacity>
        </View>
        */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 10,
  },
  backButton: {
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  profileOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    flex: 4,
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 32.5,
  },
  usernameAndOnlineStatus: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  username: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default ChatHeader;
