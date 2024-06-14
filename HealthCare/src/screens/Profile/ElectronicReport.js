import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { API_URL, FILE_API_URL } from '../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import { blackText, blueText, colorTheme, grayText } from '../../constant';
import UnderLine from '../../components/UnderLine';
import RadioButton from '../../components/RadioButton';
import axios from 'axios';
import OpenLink from '../../components/OpenLink';

const ElectronicReport = () => {
  const [pickedFile, setPickedFile] = useState(null);
  const [title, settitle] = useState('');
  const [imageChoose, setimageChoose] = useState(false);
  const [selected, setSelected] = useState({});
  const [fileFetched, setfileFetched] = useState(false)
  const [filesData, setfilesData] = useState([])

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setPickedFile(res);
      setimageChoose(true);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('User cancelled the picker');
      } else {
        // Error handling
        console.log('Error picking file:', err);
      }
    }
  };

  const uploadFile = async () => {
    console.log('uploading...');
    const formData = new FormData();
    formData.append('ehr', {
      name: pickedFile[0].name,
      type: pickedFile[0].type,
      uri: pickedFile[0].uri
    });
    formData.append('title', title);

    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${FILE_API_URL}/user/postehr`, {
        method: 'POST',
        body: formData,
        headers: {
          'auth-token': token,
        }
      });
      const data = await response.text();
      setimageChoose(false);
      console.log('Upload success:', data);
      // After successful upload, fetch all files again
      getAllFile();
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  async function getAllFile(params) {
    try {
      console.log('inside file');
      const token = await AsyncStorage.getItem("userToken");
      const config = {
        headers: {
          'auth-token': token,
        }
      }
      const res = await axios.get(`${FILE_API_URL}/user/getallmyehr`, config)
      console.log(res.data);
      setfilesData(res.data)
      setfileFetched(true)
    } catch (error) {
      console.log(error.response.data);
    }
  }
  async function updatePermission(id) {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const config = {
        headers: {
          'auth-token': token,
        }
      }
      const body = {
        'fileid': id
      }
      const res = await axios.post(`${API_URL}/user/editpermission`, body, config)
      console.log('permission---->',res.data);
      // After updating permission, fetch all files again
      getAllFile();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    getAllFile()
  }, [])


  const handleRadioButtonPress = (index) => {
    setSelected(prevState => {
      const newSelected = { ...prevState };
      newSelected[index] = !newSelected[index];
      return newSelected;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Header leftIconName header={'Your Profile'} titleMargin={30} />
        </View>
        {/* Main Content */}
        <View style={styles.content}>
          <TextInput
            onChangeText={(text) => settitle(text)}
            placeholder='Enter Report Title'
            style={{ borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 10, paddingHorizontal: 10, marginVertical: 20 }}
            value={title}
          />
          {imageChoose && <Text>You have Choosen the file</Text>}
          <TouchableOpacity
            onPress={pickFile}
            style={{ width: '100%', backgroundColor: colorTheme.primaryColor, borderRadius: 10, marginVertical: 15 }}>
            <Text style={{ padding: 15, textAlign: 'center', color: 'white', }}>Select Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={uploadFile}
            style={{ width: '100%', backgroundColor: colorTheme.primaryColor, borderRadius: 10 }}>
            <Text style={{ padding: 15, textAlign: 'center', color: 'white', }}>Upload</Text>
          </TouchableOpacity>
          <UnderLine marginTop={20} />
          <Text style={[styles.bigText, { textAlign: 'center', marginTop: 10 }]} >Allow Permission to view file</Text>
          {fileFetched ? filesData.map((dat, index) => (
            <View key={index} style={{ marginTop: 10, }}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Pressable onPress={() => handleRadioButtonPress(index)}>
                  <RadioButton selected={selected[index]} />
                </Pressable>
                <View style={{ marginLeft: 10, width: '90%' }}>
                  <Text style={[styles.bigText, { fontSize: 15 }]}>{dat.title}t</Text>
                  <OpenLink url={`https://backend-telehealth.onrender.com/uploads/${dat.path}`} />
                  <Text style={[styles.smallText, { fontSize: 12, }, dat.permission === 'private' ? { color: 'green' } : { color: 'red' }]}>{dat.permission}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={()=>{updatePermission(dat._id)}}
                style={{ width: '100%', backgroundColor: colorTheme.primaryColor, borderRadius: 10, marginVertical: 15 }}>
                <Text style={{ padding: 15, textAlign: 'center', color: 'white', }}>Update Report Status</Text>
              </TouchableOpacity>
              <UnderLine marginTop={5} />
            </View>
          )) : <ActivityIndicator size={50} />}

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorTheme.appBackGroundColor,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 5
  },
  content: {
    flex: 1,
    width: '90%',
    alignSelf: 'center'
  },
  footer: {
    padding: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center'
  },
  bigText: {
    fontSize: blackText.fontSize,
    color: blackText.color,
    fontWeight: blackText.fontWeight
  },
  smallText: {
    fontSize: grayText.fontSize,
    color: grayText.color,
    fontWeight: grayText.fontWeight
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
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});


export default ElectronicReport;
