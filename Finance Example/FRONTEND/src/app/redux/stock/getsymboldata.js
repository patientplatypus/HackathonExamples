import axios from 'axios';

// const url = 'http://localhost:8000/stock'

import envDATA from "../../../../env.json"

const url = envDATA.SERVER + "/stock"


export const getSYMBOLDATA = (payload) => {
  return (dispatch) => {
    var sendurl = url + "/" + payload.symbol
    // console.log('value of payload: ', payload);
    // console.log('value of sendurl: ', sendurl);
    dispatch(SAVESMBL(payload.symbol))
    axios.get(sendurl)
    .then((response)=>{
      // console.log('inside response from single patient : ', response);
      // let timeSeries = response.data["Time Series (1min)"];
      // console.log('value of timeSeries: ', timeSeries);
      // console.log('value of timeSeries.length: ', timeSeries.length);
      // console.log('value of timeSeries [n]: ', timeSeries[""]);
      // let stopLength = timeSeries.length;
      let timeSeriesCounter = 0;
      let responsePayload = [];
      var name = Object.keys(response.data["Time Series (1min)"])



        function resolveAfterLoop() {
          return new Promise(resolve => {

            for (var key in response.data["Time Series (1min)"]) {
              var obj = response.data["Time Series (1min)"][key];
              // console.log("value of obj: ", obj);
              // console.log('value of obj[close]: ', obj['4. close']);
              responsePayload.push({
                close : obj['4. close'],
                time: name[timeSeriesCounter]
              })
              // console.log('value of timeSeries.length: ', timeSeries.length);
              timeSeriesCounter+=1;
              if (timeSeriesCounter===100){
                // console.log('value of responsePayload: ', responsePayload);
                // console.log('value of name: ', name);
                resolve('resolved');
              }
            }
            // setTimeout(() => {
            //
            // }, 2000);
          });
        }

        async function asyncCall(dispatch){
          console.log('calling');
          var result = await resolveAfterLoop();
          dispatch(AXIOSRETURNGETSYMBOLDATA(responsePayload))
          // expected output: "resolved"
        }

        asyncCall(dispatch);

      // timeSeries.forEach(datum => {
      //   var timeName = Object.keys(datum)[0];
      //   responsePayload.push({
      //     time: timeName,
      //     close: datum.close
      //   })
      //   timeSeriesCounter += 1;
      //   if(timeSeriesCounter===stopLength){
      //     dispatch(AXIOSRETURNGETSYMBOLDATA(datum))
      //   }
      // })
    })
    .catch(error => {
      console.log('inside error from login auth and response : ', error);
      dispatch(AXIOSERRORGETSYMBOLDATA(error))
    })
  }
}

//HERE ARE THE ACTIONS ->>> REDUCERS

export const SAVESMBL = (payload) => {
  return{
    type: 'SAVE_SMBL',
    data: payload
  }
}


export const AXIOSRETURNGETSYMBOLDATA = (payload) => {
  console.log('inside AXIOSRETURN and payload ', payload);
  return{
    type: 'SYMBOL_DATA',
    data: payload
  }
}

export const AXIOSERRORGETSYMBOLDATA = (payload) => {
  console.log('inside AXIOSERROR and payload ', payload);
  return{
    type: 'SYMBOL_DATA_ERROR',
    data: payload
  }
}
