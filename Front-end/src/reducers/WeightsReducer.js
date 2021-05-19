const initialState = {
  weights: [],
  loading: false,
  error: null,
  weight: "",
  updateId: "",
  
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INITIAL_FETCH_WEIGHTS":
      state.weights = action.payload.weights;
      const usersWeightsArray = state.weights.filter(
        (item) => item.user === action.payload.user
      );
      console.log(usersWeightsArray);

      return {
        ...state,
        weights: usersWeightsArray,
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
      return {
        ...state,
        weights: [...state.weights, action.payload.res],
      };
    case "UPDATE_WEIGHT":
      //finding index of the item
      const index = state.weights.findIndex(
        (item) => item._id === action.payload.res._id
      );
      console.log("INDEX", index);
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
