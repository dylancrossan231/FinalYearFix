const initialState = {
  nutritions: [],
  loading: false,
  error: null,
  protein: "",
  carbohydrate: "",
  fats: "",
  updateId: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INITIAL_FETCH_NUTRITION":
      state.nutritions = action.payload.nutritions;
      const usersNutritionArray = state.nutritions.filter(
        (item) => item.user === action.payload.user
      );
      console.log(usersNutritionArray);
      return {
        ...state,
        nutritions: usersNutritionArray,
      };
    // case "SET_LOADING":
    //   return {
    //     ...state,
    //     loading: !state.loading,
    //   };
    case "DELETE_NUTRITION":
      return {
        ...state,
        nutritions: state.nutritions.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    case "SET_ERROR_NUTRITION":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "FORM_UPDATE_NUTRITION":
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
    case "NEW_NUTRITION":
      console.log(action.payload.nutrition);
      return {
        ...state,
        nutritions: [...state.nutritions, action.payload],
      };
    case "UPDATE_NUTRITION":
      //finding index of the item
      const index = state.nutritions.findIndex(
        (item) => item._id === action.payload.res._id
      );
      console.log(index)
      //making a new array
      const newArray = [...state.nutritions];
      //changing value in the new array
      newArray[index] = action.payload.res;

      return {
        //copying the orignal state
        ...state,
        //reassingning todos to new array
        nutritions: newArray,
      };
    case "PASS_NUTRITION_VARIABLES_TO_STATE":
      console.log(action.payload);
      return {
        ...state,
        protein: action.payload.protein,
        carbohydrate: action.payload.carbohydrate,
        fats: action.payload.fats,
        updateId: action.payload.id,
      };

    default:
      return state;
  }
};
