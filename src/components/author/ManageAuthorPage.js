import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthorForm from './AuthorForm';
import * as authorActions from '../../actions/authorActions';
import toastr from 'toastr';

class ManageAuthorPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			author: Object.assign({}, this.props.author),
			saving: false
		};

		this.updateAuthorState = this.updateAuthorState.bind(this);
		this.saveAuthor = this.saveAuthor.bind(this);
	}

	updateAuthorState(event) {
		const field = event.target.name;
		let author = Object.assign({}, this.state.author);
		author[field] = event.target.value;
		return this.setState({author: author});
	}

	redirectToAuthorPage() {
		this.setState({saving: false});
		toastr.success('Author Saved Successfully');
		this.context.router.push('authors');
	}
	
	saveAuthor(event) {
		event.preventDefault();
		this.setState({saving: true});

		this.props.actions.createAuthor(this.state.author)
			.then(() => this.redirectToAuthorPage())
			.catch(error => {
				throw(error);
			});
	}

	render () {
		return (
			<AuthorForm 
				author={this.state.author} 
				onSave={this.saveAuthor} 
				onChange={this.updateAuthorState}
				saving={this.state.saving} />
		);
	}
}

function getAuthorById(authors, authorId) {
	const authorEmpty = {
		firstName: '',
		lastName: ''
	};

	const author = authors.filter(author => author.id == authorId);
	if (author) return author[0];
	return authorEmpty;
}

ManageAuthorPage.propTypes = {
	author: PropTypes.object.isRequired,
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

ManageAuthorPage.contextTypes = {
	router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
	const authorId = ownProps.params.id;

	const author = getAuthorById(state.authors, authorId);

	return {
		author: author,
		authors: state.authors
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(authorActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);

