const errorReducer = (state = null, action: any) => {
  switch (action.type) {
    case "SET_ERROR":
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;
