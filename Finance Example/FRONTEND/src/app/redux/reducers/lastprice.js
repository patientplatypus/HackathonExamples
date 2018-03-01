const lastprice = (state = [], action) => {
  switch (action.type) {
    case 'LAST_PRICE':
      console.log('inside lastprice and action.data: ', action.data);
      return state = action.data;
    case 'LAST_PRICE_ERROR':
      return state = action.data;
    default:
      return state;
  }
}

export default lastprice
