import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

//Test a sync action
describe('Course Actions', () => {
	describe('createCourseSuccess', () => {
		it('should create a UPDATE_COURSE_SUCCESS action', () => {
			//arrange
			const course = {
				id: 'clean-code',
				title: 'Clean Code'
			};

			const expectedAction = {
				type: types.UPDATE_COURSE_SUCCESS,
				course: course
			};

			//act
			const action = courseActions.updateCourseSuccess(course);

			//assert
			expect(action).toEqual(expectedAction);
		});
	});
});

//configure mock store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
	afterEach(() => {
		nock.cleanAll();
	});

	it('should create BEGIN_AJAX_CALL and LOAD_COURSE_SUCCESS when loading courses', (done) => {
		const expectActions = [
			{ type: types.BEGIN_AJAX_CALL },
			{ type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id: 'clean-code', title: 'Clean Code'}]}}
		];

		const store = mockStore({courses:[]}, expectActions);
		store.dispatch(courseActions.loadCourses()).then(() => {
			const actions = store.getActions();
			expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
			expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
			done();
		});

	});
});