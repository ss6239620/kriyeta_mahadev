import { SendDirectSms } from 'react-native-send-direct-sms'

function sendSmsData(SMSData) {
    SMSData.map((data, index) => {
        SendDirectSms(data.phone, data.msg)
            .then((res) => console.log("then", res))
            .catch((err) => console.log("catch", err))
    })

}


export { sendSmsData }
