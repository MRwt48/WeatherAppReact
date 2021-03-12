const locationReducer = (state = { lat: 0, lon: 0 }, action: any) => {
  switch (action.type) {
    case "SET_LOCATION":
      return action.payload;
    default:
      return state;
  }
};

export default locationReducer;
