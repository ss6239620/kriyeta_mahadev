import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { colorTheme } from '../constant';

const OpenLink = ({ url }) => {
  const handlePress = async () => {
    // Check if the URL is valid
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Open the URL in the default browser
      await Linking.openURL(url);
    } else {
      console.error("Don't know how to open URI: " + url);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={{color:colorTheme.primaryColor}}>{url}</Text>
    </TouchableOpacity>
  );
};

export default OpenLink;
