import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import { browserHistory } from 'react-router';
import toastr from 'toastr';


class AuthorPage extends React.Component {
	constructor(props) {
		super(props);

		this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
		this.deleteAuthor = this.deleteAuthor.bind(this);
	}

	redirectToAddAuthorPage() {
		browserHistory.push('/author');
	}

	deleteAuthor(authorId) {
		this.props.actions.deleteAuthor(authorId)
			.then(() => {
				toastr.success('Author Deleted Successfully');
			})
			.catch(error => {
				throw(error);
			});
	}

	render() {
		return (
			<div>
				<h1>Author Page</h1>
				<input
					type="submit"
					value="Add Author"
					className="btn btn-primary"
					onClick={this.redirectToAddAuthorPage} />
				<AuthorList
					authors = {this.props.authors} 
					handleDelete= {this.deleteAuthor} />
			</div>
		);
	}
}

AuthorPage.propTypes = {
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		authors: state.authors
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(authorActions, dispatch)
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
