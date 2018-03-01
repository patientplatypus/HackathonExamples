const getsymboldata = (state = [], action) => {
  switch (action.type) {
    case 'SYMBOL_DATA':
      console.log('inside getsymboldata and action.data: ', action.data);
      return state = action.data;
    case 'SYMBOL_DATA_ERROR':
      return state = action.data;
    default:
      return state;
  }
}

export default getsymboldata
