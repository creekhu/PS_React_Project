import * as type from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action) {
	switch(action.type) {
		case type.LOAD_AUTHORS_SUCCESS:
			return action.authors;

		case type.CREATE_AUTHOR_SUCCESS:
			return [
				...state.filter(author => author.id !== action.author.id),
				Object.assign({}, action.author)
			];

		case type.DELETE_AUTHOR_SUCCESS:
			return action.authors;

		default:
			return state;
	} 
}