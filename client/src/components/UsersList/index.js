import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './UsersList.module.css';

const UsersList = ({users, currentUser, onSelect}) => {
	return (
			<ul className={ styles.container }>
				{
					users.map(u => ( <li onClick={ () => onSelect(u) }
					                     className={ classNames(styles.userItem, {
						                     [ styles.userItemSelected ]: u === currentUser,
					                     }) } key={ u }>{ u }</li> ))
				}
			</ul>
	);
};

UsersList.propTypes = {
	users: PropTypes.arrayOf(PropTypes.string),
	currentUser: PropTypes.string,
};

export default UsersList;