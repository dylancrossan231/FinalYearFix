/**
 * Import modules which can be accessed
 */
import { combineReducers } from "redux";
import PeopleReducer from './PeopleReducer'
import WorkoutReducer from './WorkoutReducer'
import ExerciseReducer from './ExerciseReducer';
import WeightsReducer from './WeightsReducer';
import SleepReducer from "./SleepReducer";

 /**
 * Combine and Export these modules to the rest of the application
 */
export default combineReducers({people: PeopleReducer, workout: WorkoutReducer, exercise: ExerciseReducer, weight: WeightsReducer,sleep: SleepReducer })