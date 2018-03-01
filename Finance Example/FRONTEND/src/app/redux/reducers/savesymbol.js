const savesymbol = (state = ``, action) => {
  switch (action.type) {
    case 'SAVE_SMBL':
      return state = action.data;
    default:
      return state;
  }
}

export default savesymbol
