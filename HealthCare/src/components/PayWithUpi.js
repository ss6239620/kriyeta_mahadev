import RNUpiPayment from 'react-native-upi-payment'
import { sendSmsData } from './SendSMS'



function handleSMS(params) {
    const dat= new Date().getDate()
    const SMSDATA = [
        {
            phone: '7718833236',
            msg: `Your appointment has been scheduled`
        },
        {
            phone: '9869852633',
            msg: `346773 this is code for video chat with patient at time ${dat}`
        },
    ]

    // console.log('msg sending...')
    sendSmsData(SMSDATA)
}

function PayNow(params) {
    RNUpiPayment.initializePayment(
        {
            vpa: '9869852633@postbank', // or can be john@ybl or mobileNo@upi
            payeeName: 'Sharvesh Singh',
            amount: '100',
            transactionRef: 'aasf-332-aoei-fn',
        },
        successCallback,
        failureCallback
    );
    function successCallback(data) {
        console.log(data);
    }
    function failureCallback(data) {
        console.log('i am fail');
        handleSMS()
        console.log(data);
    }
}

export { PayNow }
