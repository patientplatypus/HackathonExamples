import axios from 'axios';

// const url = 'http://129.146.85.80:8000/';
// http://private-0a8629-ironbankbcsapidoc.apiary-mock.com/pd/FirstName/LastName

// const server = process.env.SERVER
//
// const url = server + '/request'

import envDATA from "../../../../env.json"

const url = envDATA.SERVER + '/request'


// const url2 = 'http://localhost:5000/callback'
// const url = 'https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json"'
//http://129.146.106.151:8080/rx/ID

//WHY ARE WE DOING THIS???

//if you store the authorization key in localStorage of the browser it allows outside sites to see the authorization for the site.
//for non-production sites this does not matter
//HOWEVER
//if we allow malicious actors access to servers they can use runtime to spin up blockchain mining or other monetarily risky enterprises.
//THIS IS BAD
//So instead we should store the authorization either locally or send to reducers and access there.

//HERE ARE THE AXIOS CALLS

export const getIOTINFO = (payload) => {
  return (dispatch) => {
    // axios.defaults.headers.common['Authorization'] = " Bearer " + payload.token;
    // console.log('value of payload token: ', payload.token);
    console.log('value of payload: ', payload.token);
    axios.post(url,{
      data:{
        token: payload.token
      }
    })
    .then((response)=>{
      console.log('inside response from getIOT : ', response);
      // dispatch(AXIOSRETURNGETIOT(response))
      dispatch(AXIOSRETURNGETIOT(response))
    })
    .catch(error => {
      console.log('inside error from login auth and response : ', error);
      dispatch(AXIOSERRORRGETIOT(error))
    })
  }
}




//HERE ARE THE ACTIONS ->>> REDUCERS

export const AXIOSRETURNGETIOT = (payload) => {
  console.log('inside AXIOSRETURN and payload ', payload);
  return{
    type: 'IOT_INFO',
    data: payload.data
  }
}

export const AXIOSERRORRGETIOT = (payload) => {
  console.log('inside AXIOSERROR and payload ', payload);
  return{
    type: 'IOT_ERROR',
    data: payload
  }
}
