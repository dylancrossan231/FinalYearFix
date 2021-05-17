const initialState = {
  weights: [],
  loading: false,
  error: null,
  weight: "",
  updateId: ""
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
      console.log(action.payload.weight);
      return {
        ...state,
        weights: [...state.weights, action.payload],
      };
    case "UPDATE_WEIGHT":
      //finding index of the item
      const index = state.weights.findIndex(
        (item) => item.id !== action.payload.res._id
      );
      //making a new array
      const newArray = [...state.weights];
      //changing value in the new array
      newArray[index] = action.payload.res;

      return {
        //copying the orignal state
        ...state,
        //reassingning todos to new array
        weights: newArray,
      };
    case "PASS_WEIGHT_AND_ID_TO_STATE":
      console.log(action.payload);
      return {
        ...state,
        weight: action.payload.weight,
        updateId: action.payload.id,
      };

    default:
      return state;
  }
  
};
