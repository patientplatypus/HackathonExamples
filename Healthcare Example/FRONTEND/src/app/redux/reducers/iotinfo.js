const iotinfo = (state = null, action) => {
  switch (action.type) {
    case 'IOT_INFO':
      console.log('value of IOT_INFO: ', action.data);
      return state = action.data;
    case 'IOT_ERROR':
      return state = action.data;
    default:
      return state;
  }
}

export default iotinfo
