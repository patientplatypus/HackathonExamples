import axios from 'axios';

// const url = 'http://129.146.85.80:8000/';
// http://private-0a8629-ironbankbcsapidoc.apiary-mock.com/pd/FirstName/LastName

// 129.146.106.151:8080
// const url = 'http://private-0a8629-ironbankbcsapidoc.apiary-mock.com/pd'

import envDATA from "../../../../env.json"

// const server = process.env.SERVER
// const server = process.env.SERVER
//
// const nodeval = process.env.NODE_ENV

// const url = 'http://129.146.106.151:8080/pd'
const url = envDATA.SERVER + "/pd"

//const url = 'http://backend:8080/pd';
//WHY ARE WE DOING THIS???

//if you store the authorization key in localStorage of the browser it allows outside sites to see the authorization for the site.
//for non-production sites this does not matter
//HOWEVER
//if we allow malicious actors access to servers they can use runtime to spin up blockchain mining or other monetarily risky enterprises.
//THIS IS BAD
//So instead we should store the authorization either locally or send to reducers and access there.

//HERE ARE THE AXIOS CALLS

export const getALLPATIENTS = () => {
  return (dispatch) => {
    var sendurl = url;
    console.log('value of url : ' + url);
    // console.log('value of sendurl: ', sendurl);
    // console.log('value of server: ', server);
    // console.log('hello there: ', hellothere)
    console.log("value of hellothere from envDATA: ", JSON.stringify(envDATA.SERVER))
    axios.get(sendurl)
    .then((response)=>{
      console.log('inside response from all patients: ', response);
      dispatch(AXIOSRETURNALLPATIENTS(response))
    })
    .catch(error => {
      console.log('inside error from login auth and response : ', error);
      dispatch(AXIOSERRORALLPATIENTS(error))
    })
  }
}

//HERE ARE THE ACTIONS ->>> REDUCERS

export const AXIOSRETURNALLPATIENTS = (payload) => {
  console.log('inside AXIOSRETURN and payload ', payload);
  return{
    type: 'ALL_PATIENTS',
    data: payload.data
  }
}

export const AXIOSERRORALLPATIENTS = (payload) => {
  console.log('inside AXIOSERROR and payload ', payload);
  return{
    type: 'ALL_ERROR',
    data: payload
  }
}
