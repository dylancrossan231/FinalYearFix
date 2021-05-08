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
      return {
        ...state,
        sleeps: action.payload,
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
    //   const sleep = action.payload.res;

    //   const sleeps = state.sleeps; 
      
    //   const index = sleeps.findIndex((item) => sleep._id === item._id);
    //   if (index !== -1) {
    //     sleeps.splice(index, 1, sleep);
    //   }
    //   console.log(sleep)
    //   console.log(index)

    //   return {
    //     ...state,
    //     sleeps : [state.sleeps]
    //   };

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
