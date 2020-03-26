import React, {Component} from 'react';
import './App.css';
import {emitMessage, emitTest} from './api/ws/api.js';
import styles from './App.module.css';
import socket from './api/ws';

function MessagesList(props) {
	const {messages} = props;
	return (
			<ol className={ styles.messagesList }>
				{
					messages.map((msg, index) => ( <li key={ index }>{ msg }</li> ))
				}
			</ol>
	);

}

class App extends Component{

	constructor(props) {
		super(props);
		this.state = {

			room1: {
				messages: [],
			},
			room2: {
				messages: [],
			},
			currentRoom: 'room1',
			message: '',
		};
	}

	componentDidMount() {
		socket.on('new-message', this.handleNewMessage);
	}

	handleNewMessage = (room, message) => {
		console.log(room);
		this.setState({
			[ room ]: {
				messages: [...this.state[ room ].messages, message],
			},
		});

	};

	switchRoom = (e) => {
		this.setState({
			currentRoom: e.target.value,
		});
	};

	sendMessage = () => {

		const {currentRoom, message} = this.state;

		emitMessage(currentRoom, message);

		this.setState({
			message: '',
		});

	};

	render() {

		const {currentRoom, message, room1: {messages: room1Messages}, room2: {messages: room2Messages}} = this.state;

		return (
				<>
					<div className={ styles.roomsContainer }>
						<MessagesList messages={ room1Messages }/>
						<MessagesList messages={ room2Messages }/>
					</div>
					<label>
						<input type="radio" name={ 'currentRoom' } value={ 'room1' }
						       checked={ currentRoom === 'room1' }
						       onChange={ this.switchRoom }/>
						<span>Send to Room1</span>
					</label>
					<br/>
					<label>
						<input type="radio" name={ 'currentRoom' } value={ 'room2' }
						       checked={ currentRoom === 'room2' }
						       onChange={ this.switchRoom }/>
						<span>Send to Room2</span>
					</label>

					<div>
						<input type="text" value={ message } onChange={ (e) => {
							this.setState({
								message: e.target.value,
							});
						} }/>
						<button onClick={ this.sendMessage }>Send
							message >
						</button>
					</div>
				</>
		);
	}
}

export default App;
