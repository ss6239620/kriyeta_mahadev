import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../Splash'
import GetStarted from '../Authentication/GetStarted'
import VerifyAccount from '../Authentication/VerifyAccount'
import SignUp from '../Authentication/SignUp'
import DoctorRegister from '../Authentication/DoctorRegister'
import Login from '../Authentication/Login'
import DoctorLogin from '../Authentication/DoctorLogin'
import Olddisease from '../Authentication/Olddisease'
import LoginChoice from '../Authentication/LoginChoice'
import BottomTab from './BottomTab'
import DoctorDetail from '../AppointMents/DoctorDetail'
import BookAppointment from '../AppointMents/BookAppointment'
import SelectAppointmentPackage from '../AppointMents/SelectAppointmentPackage'
import PatientDetails from '../AppointMents/PatientDetails'
import PaymentMethod from '../AppointMents/PaymentMethod'
import SuccesfullPayment from '../AppointMents/SuccesfullPayment'
import Message from '../Chat/Messages'
import VideoCall from '../Chat/VideoCall'
import CancelBooking from '../AppointMents/CancelBooking'
import RescheduledAppointment from '../AppointMents/ReschedledAppointment'
import EditProfile from '../Profile/EditProfile'
import Settings from '../Profile/Settings'
import PasswordManager from '../Profile/PasswordManager'
import PrivacyPolicy from '../Profile/PrivacyPolicy'
import HelpCenter from '../Profile/HelpCenter'
import CompleteProfile from '../Profile/CompleteProfile'
import OfflineVideo from '../Profile/OfflineVideo'
import DoctorCompleteProfile from '../Profile/DoctorCompleteProfile'
import SuccesfullRegistration from '../Profile/SuccesfullRegistration'
import SearchResult from '../Search/SearchResult'
import Hospital from '../Hospital'
import Favorites from '../Profile/Favorites'
import ForgetPassword from '../Authentication/ForgetPassword'
import DoctorHome from '../Doctor/DoctorHome'
import Blogs from '../Doctor/Blogs'
import PatientDataAnalysis from '../Doctor/PatientDataAnalysis'
import DoctorChatRoom from '../Doctor/DoctorChatRoom'
import DoctorVideoCall from '../Doctor/DoctorVideoCall'
import SOSSettings from '../Profile/SOSSettings'
import ChatBot from '../Chat/ChatBot'
import ElectronicReport from '../Profile/ElectronicReport'
import DoctorPrescription from '../Doctor/DoctorPrescription'
import PatientInfo from '../../components/PatientInfo'
import DoctorAppointmentDetailScreen from '../Doctor/DoctorAppointmentDetailScreen'
import SymptompAnalyzer from '../Doctor/SymptompAnalyzer'
import AdvancedAnalyzer from '../Doctor/AdvancedAnalyzer'
import PatientDocument from '../Doctor/PatientDocument'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name='GetStarted' component={GetStarted} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name='DoctorRegister' component={DoctorRegister} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{ headerShown: false }} />
        <Stack.Screen name='VerifyAccount' component={VerifyAccount} options={{ headerShown: false }} />
        <Stack.Screen name='BottomTab' component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen name='DoctorDetail' component={DoctorDetail} options={{ headerShown: false }} />
        <Stack.Screen name='Hospital' component={Hospital} options={{ headerShown: false }} />
        <Stack.Screen name='BookAppointment' component={BookAppointment} options={{ headerShown: false }} />
        <Stack.Screen name='SelectAppointmentPackage' component={SelectAppointmentPackage} options={{ headerShown: false }} />
        <Stack.Screen name='PatientDetails' component={PatientDetails} options={{ headerShown: false }} />
        <Stack.Screen name='PaymentMethod' component={PaymentMethod} options={{ headerShown: false }} />
        <Stack.Screen name='SuccesfullPayment' component={SuccesfullPayment} options={{ headerShown: false }} />
        <Stack.Screen name='Message' component={Message} options={{ headerShown: false }} />
        <Stack.Screen name='VideoCall' component={VideoCall} options={{ headerShown: false }} />
        <Stack.Screen name='DoctorVideoCall' component={DoctorVideoCall} options={{ headerShown: false }} />
        <Stack.Screen name='CancelBooking' component={CancelBooking} options={{ headerShown: false }} />
        <Stack.Screen name='RescheduledAppointment' component={RescheduledAppointment} options={{ headerShown: false }} />
        <Stack.Screen name='EditProfile' component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name='Settings' component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name='OfflineVideo' component={OfflineVideo} options={{ headerShown: false }} />
        <Stack.Screen name='PasswordManager' component={PasswordManager} options={{ headerShown: false }} />
        <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} options={{ headerShown: false }} />
        <Stack.Screen name='SOSSettings' component={SOSSettings} options={{ headerShown: false }} />
        <Stack.Screen name='HelpCenter' component={HelpCenter} options={{ headerShown: false }} />
        <Stack.Screen name='CompleteProfile' component={CompleteProfile} options={{ headerShown: false }} />
        <Stack.Screen name='SearchResult' component={SearchResult} options={{ headerShown: false }} />
        <Stack.Screen name='Favorites' component={Favorites} options={{ headerShown: false }} />
        <Stack.Screen name='DoctorHome' component={DoctorHome} options={{ headerShown: false }} />
        <Stack.Screen name='Blogs' component={Blogs} options={{ headerShown: false }} />
        <Stack.Screen name='SuccesfullRegistration' component={SuccesfullRegistration} options={{ headerShown: false }} />
        <Stack.Screen name='LoginChoice' component={LoginChoice} options={{ headerShown: false }} />
        <Stack.Screen name='Olddisease' component={Olddisease} options={{ headerShown: false }} />
        <Stack.Screen name='DoctorLogin' component={DoctorCompleteProfile} options={{ headerShown: false }} />
        <Stack.Screen name='DoctorCompleteProfile' component={DoctorCompleteProfile} options={{ headerShown: false }} />
        <Stack.Screen name='DoctorChatRoom' component={DoctorChatRoom} options={{ headerShown: false }} />
        <Stack.Screen name='DoctorPrescription' component={DoctorPrescription} options={{ headerShown: false }} />
        <Stack.Screen name='PatientDataAnalysis' component={PatientDataAnalysis} options={{ headerShown: false }} />
        <Stack.Screen name='ChatBot' component={ChatBot} options={{ headerShown: false }} />
        <Stack.Screen name='ElectronicReport' component={ElectronicReport} options={{ headerShown: false }} />
        <Stack.Screen name='PatientInfo' component={PatientInfo} options={{ headerShown: false }} />
        <Stack.Screen name='SymptompAnalyzer' component={SymptompAnalyzer} options={{ headerShown: false }} />
        <Stack.Screen name='AdvancedAnalyzer' component={AdvancedAnalyzer} options={{ headerShown: false }} />
        <Stack.Screen name='PatientDocument' component={PatientDocument} options={{ headerShown: false }} />
        <Stack.Screen name='DoctorAppointmentDetailScreen' component={DoctorAppointmentDetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  )
}
