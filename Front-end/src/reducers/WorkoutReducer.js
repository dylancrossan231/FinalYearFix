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
        state.workouts = action.payload.workouts;
        const usersWorkoutsArray = state.workouts.filter(
          (item) => item.user === action.payload.user
        );
        console.log(usersWorkoutsArray);

        return {
          ...state,
          workouts: usersWorkoutsArray,
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
      case "FORM_UPDATE_WORKOUT_REP":
        const exerciseIndexRep = action.payload.prop[0];
        const setsIndexRep = action.payload.prop[1];

        const workoutExercisesTwo = state.workoutExercises;
        workoutExercisesTwo[exerciseIndexRep].sets[setsIndexRep].rep =
          action.payload.value;

        workoutExercisesTwo[exerciseIndexRep].sets = [
          ...workoutExercisesTwo[exerciseIndexRep].sets,
        ];

        return {
          ...state,
          workoutExercises: [...workoutExercisesTwo],
        };

      case "FORM_UPDATE_WORKOUT_WEIGHT":
        console.log(action.payload);
        const exerciseIndexWeight = action.payload.prop[0];
        const setsIndexWeight = action.payload.prop[1];

        const workoutExercisesThree = state.workoutExercises;
        workoutExercisesThree[exerciseIndexWeight].sets[
          setsIndexWeight
        ].weight = action.payload.value;

        workoutExercisesThree[exerciseIndexWeight].sets = [
          ...workoutExercisesThree[exerciseIndexWeight].sets,
        ];

        return {
          ...state,
          workoutExercises: [...workoutExercisesThree],
        };

      case "NEW_WORKOUT":
        console.log(action.payload);
        return {
          ...state,
          workouts: [...state.workouts, action.payload],
        };
      default:
        return state;
    }

    }
