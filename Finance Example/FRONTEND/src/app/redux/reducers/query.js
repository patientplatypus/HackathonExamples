const query = (state = [], action) => {
  switch (action.type) {
    case 'QUERY_RETURN':
      console.log('inside query and action.data: ', action.data);
      return state = action.data;
    case 'QUERY_ERROR':
      return state = action.data;
    default:
      return state;
  }
}

export default query
