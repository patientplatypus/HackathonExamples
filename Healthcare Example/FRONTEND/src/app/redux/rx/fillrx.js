import axios from 'axios';

// const url = 'http://129.146.85.80:8000/';
// http://private-0a8629-ironbankbcsapidoc.apiary-mock.com/pd/FirstName/LastName

// const server = process.env.SERVER



import envDATA from "../../../../env.json"

const url = envDATA.SERVER + '/rx'

//http://129.146.106.151:8080/rx/ID

//WHY ARE WE DOING THIS???

//if you store the authorization key in localStorage of the browser it allows outside sites to see the authorization for the site.
//for non-production sites this does not matter
//HOWEVER
//if we allow malicious actors access to servers they can use runtime to spin up blockchain mining or other monetarily risky enterprises.
//THIS IS BAD
//So instead we should store the authorization either locally or send to reducers and access there.

//HERE ARE THE AXIOS CALLS

export const fillRX = (payload) => {
  return (dispatch) => {
    console.log('value of payload: ', payload);
    var sendurl = url + "/" + payload.id
    console.log('value of sendurl: ', sendurl);
    console.log('^^^^^^^^^');
    console.log('fillrx info: ', payload);
    console.log('value of payload.id ', payload.id);
    console.log('value of payload.rxid: ', payload.rxid);
    console.log('^^^^^^^^^');
    axios.patch(sendurl,{
      RXID: payload.rxid,
      Status: "Filled",
      Timestamp: Date.now()
    })
    .then((response)=>{
      console.log('inside response from login auth and response : ', response);
      dispatch(AXIOSRETURNFILLRX(response))
    })
    .catch(error => {
      console.log('inside error from login auth and response : ', error);
      dispatch(AXIOSERRORRFILLRX(error))
    })
  }
}

//HERE ARE THE ACTIONS ->>> REDUCERS

export const AXIOSRETURNFILLRX = (payload) => {
  console.log('inside AXIOSRETURN and payload ', payload);
  return{
    type: 'FILL_RX',
    data: payload.data
  }
}

export const AXIOSERRORRFILLRX = (payload) => {
  console.log('inside AXIOSERROR and payload ', payload);
  return{
    type: 'FILLRX_ERROR',
    data: payload
  }
}
