import axios from 'axios';

// const url = 'http://129.146.85.80:8000/';
// http://private-0a8629-ironbankbcsapidoc.apiary-mock.com/pd/FirstName/LastName
//
// const server = process.env.SERVER
//
// const url = server+'/pd'


import envDATA from "../../../../env.json"

const url = envDATA.SERVER + '/pd'

//WHY ARE WE DOING THIS???

//if you store the authorization key in localStorage of the browser it allows outside sites to see the authorization for the site.
//for non-production sites this does not matter
//HOWEVER
//if we allow malicious actors access to servers they can use runtime to spin up blockchain mining or other monetarily risky enterprises.
//THIS IS BAD
//So instead we should store the authorization either locally or send to reducers and access there.

//HERE ARE THE AXIOS CALLS

export const getPATIENTINFO = (payload) => {
  return (dispatch) => {
    var sendurl = url + "/" + payload.firstname + "/" + payload.lastname;
    console.log('value of sendurl: ', sendurl);
    axios.get(sendurl)
    .then((response)=>{
      console.log('inside response from single patient : ', response);
      dispatch(AXIOSRETURNPATIENTINFO(response))
    })
    .catch(error => {
      console.log('inside error from login auth and response : ', error);
      dispatch(AXIOSERRORPATIENTINFO(error))
    })
  }
}

//HERE ARE THE ACTIONS ->>> REDUCERS

export const AXIOSRETURNPATIENTINFO = (payload) => {
  console.log('inside AXIOSRETURN and payload ', payload);
  return{
    type: 'PATIENT_INFO',
    data: payload.data
  }
}

export const AXIOSERRORPATIENTINFO = (payload) => {
  console.log('inside AXIOSERROR and payload ', payload);
  return{
    type: 'PATIENT_ERROR',
    data: payload
  }
}
