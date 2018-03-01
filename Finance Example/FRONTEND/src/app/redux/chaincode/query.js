import axios from 'axios';

import envDATA from "../../../../env.json"

const url = envDATA.SERVER + "/chaincode"

// const url = 'http://localhost:8000/querychain'



export const sendQUERY = (payload) => {
  return (dispatch) => {
    var sendurl = url + "/" + payload.value
    console.log('value of payload: ', payload);
    console.log('value of sendurl: ', sendurl);
    axios.get(sendurl)
    .then((response)=>{
      console.log('value of response from sendorder: ', response);
      dispatch(AXIOSRETURNQUERY(response.data))
    })
    .catch(error => {
      console.log('inside error from login auth and response : ', error);
      dispatch(AXIOSERRORQUERY(error))
    })
  }
}

//HERE ARE THE ACTIONS ->>> REDUCERS

export const AXIOSRETURNQUERY = (payload) => {
  console.log('inside AXIOSRETURN and payload ', payload);
  return{
    type: 'QUERY_RETURN',
    data: payload
  }
}

export const AXIOSERRORQUERY = (payload) => {
  console.log('inside AXIOSERROR and payload ', payload);
  return{
    type: 'QUERY_ERROR',
    data: payload
  }
}
