import  { combineReducers }  from 'redux'

import getsymboldata from './getsymboldata'
import savesymbol from './savesymbol'
import sendorder from './sendorder'
import query from './query'
import lastprice from './lastprice'
import tradermoney from './tradermoney'

export default combineReducers({
  // userlogin,
  // loginreturn,
  // registerocireturn,
  // settoken,
  getsymboldata,
  savesymbol,
  sendorder,
  query,
  lastprice,
  tradermoney
})
