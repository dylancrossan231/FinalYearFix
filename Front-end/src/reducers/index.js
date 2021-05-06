/**
 * Import modules which can be accessed
 */
import { combineReducers } from "redux";
import PeopleReducer from './PeopleReducer'
import WorkoutReducer from './WorkoutReducer'
import ExerciseReducer from './ExerciseReducer';
import WeightsReducer from './WeightsReducer';

 /**
 * Combine and Export these modules to the rest of the application
 */
export default combineReducers({people: PeopleReducer, workout: WorkoutReducer, exercise: ExerciseReducer, weight: WeightsReducer })