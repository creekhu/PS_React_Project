import * as type from './actionTypes';
import CourseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
	return { type: type.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
	return { type: type.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
	return { type: type.CREATE_COURSE_SUCCESS, course };
}

export function deleteCourseSuccess(courses) {
	return { type: type.DELETE_COURSE_SUCCESS, courses };
}

export function loadCourses() {
	return function(dispatch) {
		dispatch(beginAjaxCall());
		return CourseApi.getAllCourses().then(courses => {
			dispatch(loadCoursesSuccess(courses));
		}).catch(error => {
			throw(error);
		});
	};
}

export function saveCourse(course) {
	return function (dispatch, getState) {
		dispatch(beginAjaxCall());
		return CourseApi.saveCourse(course).then(savedCourse => {
			if(course.id === null) {
				dispatch(createCourseSuccess(savedCourse));
			} else {
				dispatch(updateCourseSuccess(savedCourse));
			}
		}).catch(error => {
			dispatch(ajaxCallError(error));
			throw(error);	
		});
	};
}

export function deleteCourse(courseId) { 
	return function(dispatch) {
		return CourseApi.deleteCourse(courseId)
			.then(courses => {
				dispatch(deleteCourseSuccess(courses));
			}).catch(error => {
				dispatch(ajaxCallError(error));
				throw(error);
			}); 
	};
}
