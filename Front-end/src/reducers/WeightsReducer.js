const initialState = {
  weights: [],
  loading: false,
  error: null,
  weight: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INITIAL_FETCH_WEIGHTS":
      return {
        ...state,
        weights: action.payload,
      };
    // case "SET_LOADING":
    //   return {
    //     ...state,
    //     loading: !state.loading,
    //   };
    case "DELETE_WEIGHT":
      return {
        ...state,
        weights: state.weights.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    case "SET_ERROR_WEIGHT":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "FORM_UPDATE_WEIGHT":
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
    case "NEW_WEIGHT":
        console.log(action.payload)
      return {
        ...state,
        weights: [...state.weights, action.payload],
      };
    default:
      return state;
  }
  
};
