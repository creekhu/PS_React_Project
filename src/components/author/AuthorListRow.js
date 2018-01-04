import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AuthorListRow = ({author, handleDelete}) => {
	return (
		<tr>
			<td>
				<button 
					className="btn btn-primary"
					onClick={() => handleDelete(author.id)}>
					Delete
					</button>
			</td>
			<td><Link to={'/author/' + author.id}>{author.firstName}</Link></td>
			<td>{author.lastName}</td>
		</tr>
	);
};

AuthorListRow.propTypes = {
	author: PropTypes.object.isRequired,
	handleDelete: PropTypes.func.isRequired
}; 

export default AuthorListRow;