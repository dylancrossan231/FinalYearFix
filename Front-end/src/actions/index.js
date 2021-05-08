import AsyncStorage from '@react-native-community/async-storage';

export const selectPerson = (peopleId) => {
  return {
    type: 'SELECTED_PERSON',
    selectId: peopleId,
  };
};

export const noneSelected = () => {
  return {
    type: 'NONE_SELECTED',
  };
};

export const formUpdate = ({prop, value}) => {
  return {
    type: 'FORM_UPDATE',
    payload: {prop, value},
  };
};

export const createNewContact = ({email, password, first_name, last_name, username, weight, height, D_O_B, gender}) => {
  return (dispatch) => {


    fetch("http://192.168.1.22:300/api/user/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        username: username,
        weight: weight,
        height: height,
        D_O_B: D_O_B,
        gender: gender,
      }),
    })
      .then((response) => console.log(response))
      .then(() => {
        dispatch({ type: "NEW_CONTACT" });
      })
      .catch((error) => console.log(error));
  };
};

export const loadInitialContacts = () => {
  return (dispatch) => {
    fetch("http://192.168.1.22:3000/contacts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "INITIAL_FETCH", payload: data });
      })
      .catch(error, console.log(error));
  };
};
export const login = ({email, password}) => {
  return (dispatch) => {
    let user = {
      email: email,
      password: password,
    };
    console.log("yeehawlogin")
    fetch("http://192.168.1.22:3000/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        AsyncStorage.setItem("token", data.token);
        dispatch({ type: "USER_LOGGED_IN", payload: data });
      })
      .catch((error) => console.log(error));
  };
};

export const loadInitialWorkouts = (token) => {
  return (dispatch) => {
    dispatch({type: 'SET_LOADING'});
    fetch("http://192.168.1.22:3000/api/workouts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "INITIAL_FETCH_WORKOUTS", payload: data });
      })
      .catch((error) => {
        console.log("error load workouts!", error);
        return dispatch({
          type: "SET_ERROR",
          payload: "Error: Could not connect to the server",
        });
      });
  };
};
export const loadInitialExercises = (token) => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING" });
    fetch("http://192.168.1.22:3000/api/exercises", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "INITIAL_FETCH_EXERCISES", payload: data });
      })
      .catch((error) => {
        console.log("error load exercises!", error);
        return dispatch({
          type: "SET_ERROR",
          payload: "Error: Could not connect to the server",
        });
      });
  };
};



export const createNewWorkout = ({
  workout_name,
  workoutExercises,
  token,
}) => {
  return (dispatch) => {
    let workoutObject = {};
    // let workoutExerciseArray = [];

    workoutObject = {
        workout: {workout_name :workout_name},
        workoutExercises: workoutExercises
    }
    console.log(workoutObject)

    fetch("http://192.168.1.22:3000/api/workouts/create", {
      method: "POST",

      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        workoutObject: workoutObject,
      }),
    })
      .then((response) => console.log(response))
      .then((data) => {
        dispatch({ type: "NEW_WORKOUT", payload: data });
      })
      .catch((error) => console.log(error));
  };
};
export const addWorkoutExercise = ( workoutExercise ) => {
  return (dispatch) => {
    
        dispatch({
          type: "ADDWORKOUT_EXERCISE",
          payload: workoutExercise,
        });

};
};
export const addWorkoutExerciseSet = (setObject,exerciseId) => {
  return (dispatch) => {
    dispatch({
      type: "ADDWORKOUT_SET",
      payload: {
        setObject: setObject,
        id: exerciseId
      },
    });
  };
};

export const formUpdateWorkout = ({ prop, value }) => {
  console.log(prop);
  return {
    type: "FORM_UPDATE_WORKOUT",
    payload: { prop, value },
  };
};


export const loadInitialWeights = (token) => {
  return (dispatch) => {
    fetch("http://192.168.1.22:3000/api/weights", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
      .then((response) => {
        return response.json();

      })
      .then((data) => {
        dispatch({ type: "INITIAL_FETCH_WEIGHTS", payload: data });
      })
      .catch((error) => {
        console.log("error load weights!", error);
        return dispatch({
          type: "SET_ERROR",
          payload: "Error: Could not connect to the server",
        });
      });
  };
};

export const deleteWeight = (token,id) => {
  return (dispatch) => {
        fetch(`http://192.168.1.22:3000/api/weights/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "auth-token": token,
          },
        }).then((data) => {
          dispatch({ type: "DELETE_WEIGHT", payload: { _id: id} }).catch((error) => {
            return dispatch({
              type: "SET_ERROR_WEIGHT",
              payload: "Error: Could not connect to the server",
            });
          });
          
        });
}
};
// export const createNewWeight = ({ weight, token }) => {
//   return (dispatch) => {
//     fetch("http://192.168.1.22:3000/api/weights/create", {
//       method: "POST",
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//         "auth-token": token,
//       },
//       body: JSON.stringify({
//         weight: weight,
//       }),
//     })
//       .then((response) => console.log(response))
//       .then((data) => {
//         dispatch({ type: "NEW_WEIGHT", payload: data });
//       })
//       .catch((error) => console.log(error));
//   };
// };

export const createNewWeight = ({ weight, token }) => {
  console.log(weight)
  return (dispatch) => {
    fetch("http://192.168.1.22:3000/api/weights/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        weight: weight,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        
        dispatch({ type: "NEW_WEIGHT", payload: data });
      })
      .catch((error) => {
        console.log("error load weights!", error);
        return dispatch({
          type: "SET_ERROR",
          payload: "Error: Could not connect to the server",
        });
      });
  };
};

// export const updateWeight = ({ weight, token, id }) => {
//   const newWeight = {
//     weight: weight
//   }
//   return (dispatch) => {
//     fetch(`http://192.168.1.22:3000/api/weights/update/${id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//         "auth-token": token,
//       },
//       body: JSON.stringify(
//         newWeight
//       ),
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         dispatch({ type: "UPDATE_WEIGHT", payload: data });
//       })
//       .catch((error) => {
//         console.log("error updating weight!", error)
//         return dispatch({
//           type: "SET_ERROR",
//           payload: "Error: Could not connect to the server",
//         });
//       });
//   };
// };
export const updateWeight = ({ weightNew, token, id }) => {
  const weight = {
    weight:weightNew,
    id: id,
  };
  return (dispatch) => {
    fetch(`http://192.168.1.22:3000/api/weight/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(weight),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "UPDATE_WEIGHT",
          payload: {
            res
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "SET_ERROR_SLEEPS",
          payload: error,
        });
      });
  };
};


export const formUpdateWeight = ({ prop, value }) => {
  return {
    type: "FORM_UPDATE_WEIGHT",
    payload: { prop, value },
  };
};
export const passWeightAndID = ({ weight, id }) => {
  console.log(weight, id)
  return {
    type: "PASS_WEIGHT_AND_ID_TO_STATE",
    payload: { weight, id },
  };
};











export const loadInitialSleeps = (token) => {
  return (dispatch) => {
    fetch("http://192.168.1.22:3000/api/sleep", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "INITIAL_FETCH_SLEEPS", payload: data });
      })
      .catch((error) => {
        console.log("error load sleeps!", error);
        return dispatch({
          type: "SET_ERROR",
          payload: "Error: Could not connect to the server",
        });
      });
  };
};

export const deleteSleep = (token, id) => {
  console.log(id,token)
  return (dispatch) => {
    fetch(`http://192.168.1.22:3000/api/sleep/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "auth-token": token,
      },
    }).then((data) => {
      dispatch({ type: "DELETE_SLEEPS", payload: { _id: id } }).catch(
        (error) => {
          return dispatch({
            type: "SET_ERROR_SLEEPS",
            payload: "Error: Could not connect to the server",
          });
        }
      );
    });
  };
};

export const createNewSleep = ({ hours, minutes, token }) => {

  return (dispatch) => {
    fetch("http://192.168.1.22:3000/api/sleep/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        hours: hours,
         minutes: minutes
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "NEW_SLEEPS", payload: data });
      })
      .catch((error) => {
        console.log("error load sleeps!", error);
        return dispatch({
          type: "SET_ERROR",
          payload: "Error: Could not connect to the server",
        });
      });
  };
};

export const updateSleep = ({ hours,minutes, token, id }) => {
  const sleep = {
    hours: hours,
    minutes: minutes,
    id: id,
  };
  console.log(hours,minutes);
  return (dispatch) => {
    fetch(`http://192.168.1.22:3000/api/sleep/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(sleep),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "UPDATE_SLEEPS",
          payload: {
            res
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "SET_ERROR_SLEEPS",
          payload: error,
        });
      });
  };
};

export const formUpdateSleep = ({ prop, value }) => {
  return {
    type: "FORM_UPDATE_SLEEPS",
    payload: { prop, value },
  };
};
export const passHoursMinutesAndID = ({ hours, minutes, id }) => {
  console.log(hours, minutes, id);
  return {
    type: "PASS_HOURS_MINUTES_AND_ID_TO_STATE",
    payload: { hours, minutes, id },
  };
};
