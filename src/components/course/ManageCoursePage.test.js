import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import { ManageCoursePage } from './ManageCoursePage';

describe('Mange Course Page', () => {
	it('sets error message when trying to save empty title', () => {
		const props = {
			authors: [],
			actions: { saveCourse: () => { return Promise.resolve(); }},
			course : {
				id: '',
				watchHref: '',
				title: '',
				authorId: '',
				length: '',
				category: ''
			}
		};

		//shallow only render one layer of the component => have to use mount here
		const wrapper = mount(<ManageCoursePage {...props}/>);
		const saveButton = wrapper.find('input').last();
		expect(saveButton.props().type).toBe('submit');
		saveButton.simulate('click');
		expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
	});
});