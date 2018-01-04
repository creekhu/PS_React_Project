import React, {PropTypes} from 'react';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({authors, handleDelete}) => {
	return (
		<table className="table">
			<thead>
			<tr>
				<th>&nbsp;</th>
				<th>First Name</th>
				<th>Last Name</th>
			</tr>
			</thead>
			<tbody>
			{authors.map(author => 
				<AuthorListRow 
					key = {author.id}
					author = {author} 
					handleDelete={handleDelete} />
			)}
			</tbody>
		</table>
	);
};

AuthorList.propTypes = {
	authors: PropTypes.array.isRequired,
	handleDelete: PropTypes.func.isRequired
};

export default AuthorList;