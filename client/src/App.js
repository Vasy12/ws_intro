import React, {Component} from 'react';
import socket from './api/ws';
import MessagesList from './components/MessagesList';
import UsersList from './components/UsersList';
import styles from './App.module.css';

class App extends Component{

	constructor(props) {
		super(props);
		this.state = {
			users: new Map(),
			currentUser: '',
			message: '',
		};
	}

	componentDidMount() {
		socket.emit('get-users');
		socket.on('get-users', users => {

			const userMap = new Map();
			users.forEach(user => {
				userMap.set(user, []);
			});

			this.setState({
				users: userMap,
			});
		});
		socket.on('new-user', this.addUser);
		socket.on('user-leave', this.removeUser);
		socket.on('private-message', (message) => {

			this.state.users.get(message.author).push(message);

			this.setState({
				users: this.state.users,
			});

		});
	}

	selectUser = (user) => {
		this.setState({
			currentUser: user,
		});
	};

	addUser = (id) => {
		this.state.users.set(id, []);
		this.setState({
			users: this.state.users,
		});

	};

	removeUser = (id) => {
		this.state.users.delete(id);
		this.setState(
				{
					users: this.state.users,
				},
		);
	};

	sendMessage = () => {
		if (this.state.currentUser) {
			this.state.users.get(this.state.currentUser).push({
				body: this.state.message,
				timestamp: new Date(),
			});
			socket.emit('send-message', this.state.currentUser, {
				body: this.state.message,
				timestamp: new Date(),
			});
			this.setState({
				message: '',
			});
		}
	};

	render() {
		return (

				<div className={ styles.container }>
					<UsersList onSelect={ this.selectUser }
					           users={ [...this.state.users.keys()] }
					           currentUser={ this.state.currentUser }/>
					<div className={ styles.messagesListWrapper }>
						<MessagesList
								messages={ this.state.users.get(this.state.currentUser) }/>
						<div>
							<input type="text" value={ this.state.message }
							       onChange={ (e) => {
								       this.setState({
									       message: e.target.value,
								       });
							       } }/>
							<button onClick={ this.sendMessage }>send message
							</button>
						</div>
					</div>
				</div>
		);
	}

}

export default App;
