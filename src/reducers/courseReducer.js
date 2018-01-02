import * as type from '../actions/actionTypes';
import initialState from './initialState';


//default state has no course as an empty array 
export default function courseReducer(state = initialState.courses, action) {
	switch(action.type) {
		case type.LOAD_COURSES_SUCCESS:
			return action.courses;

		case type.CREATE_COURSE_SUCCESS:
			return [
				...state,
				Object.assign({}, action.course)
			];

		case type.UPDATE_COURSE_SUCCESS:
			return [
				...state.filter(course => course.id !== action.course.id),
				Object.assign({}, action.course)
			];

		default:
			return state;
	} 
}