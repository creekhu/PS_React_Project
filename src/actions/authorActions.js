import AuthorApi from '../api/mockAuthorApi';
import * as types from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
	return {
		type: types.LOAD_AUTHORS_SUCCESS, 
		authors
	};
}

export function loadAuthors() {
	return dispatch => {
		dispatch(beginAjaxCall());
		return AuthorApi.getAllAuthors().then(authors => {
			dispatch(loadAuthorsSuccess(authors));
		}).catch(error => {
			throw(error);
		});
	};
}

export function createAuthorSuccess(author) {
	return {
		type: types.CREATE_AUTHOR_SUCCESS,
		author
	};
}

export function createAuthor(author) {
	return dispatch => {
		return AuthorApi.saveAuthor(author)
			.then(author => {
				dispatch(createAuthorSuccess(author));
			})
			.catch(error => {
				throw(error);
			});
	};
}

export function deleteAuthorSuccess(authors) {
	return {
		type: types.DELETE_AUTHOR_SUCCESS,
		authors
	};
}

export function deleteAuthor(authorId) {
	return dispatch => {
		return AuthorApi.deleteAuthor(authorId)
			.then(authors => {
				dispatch(deleteAuthorSuccess(authors));
			})
			.catch(error => {
				throw(error);
			});
	};
}