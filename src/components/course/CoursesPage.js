import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import { browserHistory } from 'react-router';
import toastr from 'toastr';

class CoursesPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
		this.deleteCourse = this.deleteCourse.bind(this);
	}

	redirectToAddCoursePage() {
		browserHistory.push('/course');
	}

	deleteCourse(courseId) {
		this.props.actions.deleteCourse(courseId)
			.then(courses => {
				toastr.success('Course Deleted Successfully');
			}).catch(error => {
				throw(error);
			});
	}

	render() {
		const {courses} = this.props;
		
		return (
			<div>
				<h1>Courses</h1>
				<input 
					type="submit"
					value="Add course"
					className="btn btn-primary"
					onClick={this.redirectToAddCoursePage} />
				<CourseList 
					courses = {courses} 
					handleDelete = {this.deleteCourse} />
			</div>
		);
	}
}

CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		courses: state.courses
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch)
	};
}

//connect is a higher order component that wraps coursePage
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
