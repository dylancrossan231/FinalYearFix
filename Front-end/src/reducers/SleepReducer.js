const initialState = {
  sleeps: [],
  loading: false,
  error: null,
  hours: "",
  minutes: "",
  updateId: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INITIAL_FETCH_SLEEPS":
              state.sleeps = action.payload.sleeps;
              const usersSleepsArray = state.sleeps.filter(
                (item) => item.user === action.payload.user
              );
              console.log(usersSleepsArray);

      return {
        ...state,
        sleeps: usersSleepsArray,
      };
    // case "SET_LOADING":
    //   return {
    //     ...state,
    //     loading: !state.loading,
    //   };
    case "DELETE_SLEEPS":
      return {
        ...state,
        sleeps: state.sleeps.filter((item) => item._id !== action.payload._id),
      };
    case "SET_ERROR_SLEEPS":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "FORM_UPDATE_SLEEPS":
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
    case "NEW_SLEEPS":
      console.log(action.payload);
      return {
        ...state,
        sleeps: [...state.sleeps, action.payload],
      };

    case "UPDATE_SLEEPS":
 const index = state.sleeps.findIndex(item => item.id !== action.payload.res._id); //finding index of the item
 console.log(index)
 const newArray = [...state.sleeps]; //making a new array
 newArray[index] = action.payload.res;//changing value in the new array
 console.log("res", action.payload.res);
 console.log("ARRAY",newArray)
 return { 
  ...state, //copying the orignal state
  sleeps: newArray, //reassingning todos to new array
 }


    case "PASS_HOURS_MINUTES_AND_ID_TO_STATE":
      console.log(action.payload);
      return {
        ...state,
        hours: action.payload.hours,
        minutes: action.payload.minutes,
        updateId: action.payload.id,
      };

    default:
      return state;
  }
};
