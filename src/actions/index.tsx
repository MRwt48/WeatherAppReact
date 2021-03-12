export const changeLocation = (pos: { lon: number; lat: number }) => {
  return {
    type: "SET_LOCATION",
    payload: pos,
  };
};

export const throwError = (err: any) => {
  return {
    type: "SET_ERROR",
    payload: err,
  };
};
