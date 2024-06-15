import RNUpiPayment from 'react-native-upi-payment'
import { sendSmsData } from './SendSMS'



function handleSMS(phone) {
    const dat= new Date().getDate()
    const SMSDATA = [
        {
            phone: `${phone}`,
            msg: `346773 this is code for video chat with patient at time ${dat}`
        },
    ]

    // console.log('msg sending...')
    sendSmsData(SMSDATA)
}

function PayNow(phone) {
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
        handleSMS(phone)
        console.log(data);
    }
}

export { PayNow }
