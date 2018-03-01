import axios from 'axios';

// const url = 'http://localhost:8000/exchangetochain'

import envDATA from "../../../../env.json"

const url = envDATA.SERVER + "/exchangetochain"



export const sendLASTPRICE = ({payload}) => {
  return (dispatch) => {
    var sendurl = url
    console.log('value of payload: ', payload);
    console.log('value of sendurl: ', sendurl);
    console.log('value of timestamp: ', payload["timestamp"]);
    axios.post(sendurl, {
      symbol: payload.symbol,
      timestamp: payload.timestamp.toString(),
      lastprice: payload.lastprice
    })
    .then((response)=>{
      console.log('value of response from sendlastprice: ', response);
      dispatch(AXIOSRETURNLASTPRICE(response.data))
    })
    .catch(error => {
      console.log('inside error from login auth and response : ', error);
      dispatch(AXIOSERRORLASTPRICE(error))
    })
  }
}

//HERE ARE THE ACTIONS ->>> REDUCERS

export const AXIOSRETURNLASTPRICE = (payload) => {
  console.log('inside AXIOSRETURN and payload ', payload);
  return{
    type: 'LAST_PRICE',
    data: payload
  }
}

export const AXIOSERRORLASTPRICE = (payload) => {
  console.log('inside AXIOSERROR and payload ', payload);
  return{
    type: 'LAST_PRICE_ERROR',
    data: payload
  }
}
