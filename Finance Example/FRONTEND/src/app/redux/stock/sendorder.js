import axios from 'axios';

// const url = 'http://localhost:8000/order'


import envDATA from "../../../../env.json"

const url = envDATA.SERVER + "/order"


export const sendORDER = (payload) => {
  return (dispatch) => {
    var sendurl = url
    console.log('value of payload: ', payload);
    console.log('value of sendurl: ', sendurl);
    axios.post(sendurl, {
      ordertype: payload.ordertype,
      sharenumber: Number(payload.sharenumber),
      shareprice: Number.parseFloat(payload.shareprice),
      stocksymbol: payload.stocksymbol
    })
    .then((response)=>{
      console.log('value of response from sendorder: ', response);
      dispatch(AXIOSRETURNORDER(response.data))
    })
    .catch(error => {
      console.log('inside error from login auth and response : ', error);
      dispatch(AXIOSERRORORDER(error))
    })
  }
}

//HERE ARE THE ACTIONS ->>> REDUCERS

export const AXIOSRETURNORDER = (payload) => {
  console.log('inside AXIOSRETURN and payload ', payload);
  return{
    type: 'ORDER_RETURN',
    data: payload
  }
}

export const AXIOSERRORORDER = (payload) => {
  console.log('inside AXIOSERROR and payload ', payload);
  return{
    type: 'ORDER_ERROR',
    data: payload
  }
}
