import React, {Component} from 'react';
import './App.css';

const socket = new WebSocket('ws://localhost:3000/');

socket.onopen = function(event) {
	alert('Connection open!');
	console.dir(event);
};

socket.onclose = (event) => {
	alert('Connection closed!');
	console.dir(event);
};

socket.onmessage = (event) => {
	console.dir(event.data);
};

class App extends Component{

	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			messageValue: '',
		};
	}

	sendMessage = () => {
		socket.send(this.state.messageValue);
	};

	handleChange = (e) => {
		this.setState({
			messageValue: e.target.value,
		});
	};

	render() {

		return (
				<>
					<input type="textarea" value={ this.state.messageValue }
					       onChange={ this.handleChange }/>
					<button onClick={ this.sendMessage }>Send message ></button>
				</>
		);
	}
}

export default App;
