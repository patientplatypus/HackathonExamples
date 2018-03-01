import axios from 'axios';

// const url = 'http://localhost:8000/moneyinit'

import envDATA from "../../../../env.json"

const url = envDATA.SERVER + "/moneyinit"



export const moneyINIT = () => {
  return (dispatch) => {
    var sendurl = url
    axios.get(sendurl)
    .then((response)=>{
      console.log('value of response from sendorder: ', response);
      dispatch(AXIOSRETURNMONEYINIT(response.data))
    })
    .catch(error => {
      console.log('inside error from login auth and response : ', error);
      dispatch(AXIOSERRORMONEYINIT(error))
    })
  }
}

//HERE ARE THE ACTIONS ->>> REDUCERS

export const AXIOSRETURNMONEYINIT = (payload) => {
  console.log('inside AXIOSRETURN and payload ', payload);
  return{
    type: 'MONEY_INIT',
    data: payload
  }
}

export const AXIOSERRORMONEYINIT = (payload) => {
  console.log('inside AXIOSERROR and payload ', payload);
  return{
    type: 'MONEY_INIT_ERROR',
    data: payload
  }
}
