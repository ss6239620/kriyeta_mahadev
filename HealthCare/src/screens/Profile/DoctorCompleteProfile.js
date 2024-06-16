import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { blackText, blueText, colorTheme, grayText } from '../../constant';
import Header from '../../components/Header';
import { doctorServices } from '../../services/doctorAuth';
import { sendSmsData } from '../../components/SendSMS';
import TimeTextInput from '../../components/TextInputs/TimeInput';
import DropDownInput from '../../components/TextInputs/DropDownInput';
import { DoctorType, GovernmentOfficer, SlotData, Specialization } from '../../assets/data/DropDown';
import { days } from '../../assets/data/impData';

const CompleteProfile = ({ navigation }) => {
  const [uniqueid, setuniqueid] = useState('');
  const [dropDownData, setdropDownData] = useState({
    specialization: '',
    type:'',
    govno:''
  })
  const [experience, setexperience] = useState('');
  const [yrofgraduatio, setyrofgraduatio] = useState('');
  const [loaction, setloaction] = useState('');
  const [about, setabout] = useState('');
  const [fees, setfees] = useState('');
  const [phone, setPhone] = useState('');
  const [selected, setselected] = useState([]);
  const [availibility, setAvailibility] = useState({
    from: '',
    to: '',
    slot: '',
    days: '',
  });

  function generateRandom4DigitNumber() {
    // Generate a random number between 1000 and 9999 (inclusive)
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }

  function handleChooseDays(option) {
    setselected(prevState =>
      prevState.includes(option)
        ? prevState.filter(i => i !== option)
        : [...prevState, option],
    );
    // console.log(selected);
  }

  function handleUpdate(params) {
    doctorServices
      .ProfileComplete(
        uniqueid,
        dropDownData.specialization,
        experience,
        yrofgraduatio,
        dropDownData.type,
        loaction,
        about,
        fees,
        dropDownData.govno,
        phone,
        `${availibility.from},${availibility.to}`,
        availibility.slot,
        selected
      )
      .then(() => {
        const random4DigitNumber = generateRandom4DigitNumber();
        console.log(random4DigitNumber);
        const SMSDATA = [
          {
            phone: `${phone}`,
            msg: `Your Otp for registration is ${random4DigitNumber}`,
          },
        ];
        sendSmsData(SMSDATA);
        navigation.navigate('VerifyAccount', { verify: random4DigitNumber });
      });
  }

  const handleDateChange = (name, value) => {
    setAvailibility(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDropDownChange = (name, value) => {
    setdropDownData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Header
          leftIconName
          header={'Complete Your Profile'}
          titleMargin={30}
        />
      </View>
      {/* Main Content */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>
            Registration No
          </Text>
          <View style={styles.textInput}>
            <TextInput
              placeholder="200023"
              onChangeText={text => setuniqueid(text)}
              value={uniqueid}
              keyboardType='number-pad'
            />
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
            <DropDownInput
              data={Specialization}
              inputTitle={'Specialization'}
              dropDownTitle={'Specialization'}
              isUnderLineRequire={false}
              style={{ marginTop: 0}}
              handleChange={handleDropDownChange}
              textInputParams={'specialization'}
            />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>
            experience
          </Text>
          <View style={styles.textInput}>
            <TextInput
              placeholder="2 years"
              onChangeText={text => setexperience(text)}
              value={experience}
              keyboardType='number-pad'
            />
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>
            year of graduation
          </Text>
          <View style={styles.textInput}>
            <TextInput
              placeholder="2 years"
              onChangeText={text => setyrofgraduatio(text)}
              value={yrofgraduatio}
              keyboardType='number-pad'
            />
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
        <DropDownInput
              data={DoctorType}
              inputTitle={'Job Type'}
              dropDownTitle={'Job Type'}
              isUnderLineRequire={false}
              style={{ marginTop: 0}}
              handleChange={handleDropDownChange}
              textInputParams={'type'}
            />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>
            loaction
          </Text>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Mumbai"
              onChangeText={text => setloaction(text)}
              value={loaction}
            />
          </View>
        </View>
        <View style={{ marginBottom: 0 }}>
          <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>
            Availibility
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TimeTextInput
              inputTitle={'From'}
              isRequire={false}
              textInputParams={'from'}
              handleChange={handleDateChange}
            />
            <TimeTextInput
              inputTitle={'To'}
              isRequire={false}
              textInputParams={'to'}
              handleChange={handleDateChange}
            />
          </View>
        </View>
        <DropDownInput
          data={SlotData}
          inputTitle={'Slots'}
          dropDownTitle={'Slots'}
          isUnderLineRequire={false}
          style={{ marginTop: 25 }}
          handleChange={handleDateChange}
          textInputParams={'slot'}
        />
        <View style={{ marginVertical: 20 }}>
          <Text>Days</Text>
          <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
            {days.map((num, index) => {
              return (
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 40,
                    borderWidth: 1,
                    borderColor: colorTheme.borderColor,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 5,
                    backgroundColor: selected.includes(num) ? colorTheme.primaryColor : 'white'
                  }}
                  onPress={() => {
                    handleChooseDays(num);
                  }}
                  key={index}>
                  <Text style={[styles.smallText, { fontWeight: '500', color: selected.includes(num) ? 'white' : 'black' }]}>
                    {num}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>
            fees
          </Text>
          <View style={styles.textInput}>
            <TextInput
              placeholder="$70"
              onChangeText={text => setfees(text)}
              value={fees}
              keyboardType='number-pad'
            />
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
        <DropDownInput
          data={GovernmentOfficer}
          inputTitle={'Is Officer'}
          dropDownTitle={'Is Officer'}
          isUnderLineRequire={false}
          style={{ marginTop: 25 }}
          handleChange={handleDateChange}
          textInputParams={'govno'}
        />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>
            Phone No
          </Text>
          <View style={styles.textInput}>
            <TextInput
              placeholder="+91 771********"
              onChangeText={text => setPhone(text)}
              value={phone}
              keyboardType='phone-pad'
            />
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>
            about
          </Text>
          <View style={[styles.textInput, { height: 90 }]}>
            <TextInput
              placeholder="I am ...."
              onChangeText={text => setabout(text)}
              value={about}
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={{
            backgroundColor: blueText.color,
            padding: 15,
            width: '100%',
            borderRadius: 50,
            justifyContent: 'center',
          }}
          onPress={() => handleUpdate()}>
          <Text
            style={[styles.smallText, { color: 'white', alignSelf: 'center' }]}>
            Update Profile
          </Text>
        </TouchableOpacity>
      </View>
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

    // marginTop: 5
  },
  content: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  footer: {
    padding: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  bigText: {
    fontSize: blackText.fontSize,
    color: blackText.color,
    fontWeight: blackText.fontWeight,
  },
  smallText: {
    fontSize: grayText.fontSize,
    color: grayText.color,
    fontWeight: grayText.fontWeight,
  },
  blueText: {
    fontSize: blueText.fontSize,
    color: blueText.color,
    fontWeight: blueText.fontWeight,
  },
  textInput: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 0,
    borderWidth: 1,
    borderColor: '#d3d2d6',
    // height: 200,
    textAlignVertical: 'top',
  },
  image: {
    width: 115,
    height: 130,
    borderRadius: 25,
    overflow: 'hidden',
  },
});

export default CompleteProfile;
