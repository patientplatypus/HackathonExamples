const tradermoney = (state = [], action) => {
  switch (action.type) {
    case 'MONEY_INIT':
      return state = action.data;
    case 'MONEY_INIT_ERROR':
      return state = action.data;
    default:
      return state;
  }
}

export default tradermoney
