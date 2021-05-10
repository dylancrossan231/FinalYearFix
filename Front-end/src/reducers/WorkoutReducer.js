const initialState = {
    detailView: false,
    workouts: [],
    selectedWorkout: null,
    error: null,
    loading: false,
    workoutExercises: [],
    workout_name: "",
    workoutExerciseCounter: 0

}

export default (state = initialState, action) => {
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
        };

      case "SET_ERROR":
        return {
          ...state,
          error: action.payload,
          loading: false,
        };

      case "INITIAL_FETCH_WORKOUTS":
        return {
          ...state,
          workouts: action.payload,
          loading: false,
          error: null,
        };
      case "ADDWORKOUT_EXERCISE":
        return {
          ...state,
          workoutExercises: [...state.workoutExercises, action.payload],
        };

      case "ADDWORKOUT_SET":
        const index = state.workoutExercises.findIndex(
          (item) => item.exercise === action.payload.id
        );
        let workoutExercises = state.workoutExercises;

        workoutExercises[index].sets = [
          ...workoutExercises[index].sets,
          action.payload.setObject,
        ];
        return {
          ...state,
          workoutExercises: [...workoutExercises],
        };

      case "FORM_UPDATE_WORKOUT":
        return {
          ...state,
          [action.payload.prop]: action.payload.value,
        };
      case "FORM_UPDATE_REP":
        workoutExercises = state.workoutExercises
              // const index = workoutExercises.findIndex(
              //   (item) => item.exercise === action.payload.exercise
              // );
        return {
          ...state,
          [action.payload.prop]: action.payload.value,
        };
      case "NEW_WORKOUT":
        return {
          ...state,
          workouts: [...state.workouts, action.payload],
        };
      default:
        return state;
    }

    }
