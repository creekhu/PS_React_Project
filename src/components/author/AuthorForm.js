import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';

const AuthorForm = ({author, onSave, onChange, saving}) => {
	return (
		<form>
			<h1>Manage Author</h1>
			<TextInput
				name="firstName"
				label="FirstName"
				value={author.firstName} 
				onChange={onChange} />

			<TextInput
				name="lastName"
				label="LastName"
				value={author.lastName} 
				onChange={onChange} />

			<input 
				type="submit"
				className="btn btn-primary"
				onClick={onSave} 
				value={saving ? 'Saving...' : 'Save'}/>
		</form>
	);
};

AuthorForm.propTypes = {
	author: PropTypes.object.isRequired,
	onSave: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	saving: PropTypes.bool.isRequired
};

export default AuthorForm;