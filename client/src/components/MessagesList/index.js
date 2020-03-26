import React from 'react';

const MessageItem = ({author, body, timestamp}) => {

	return (
			<li style={ {
				margin: '20px',
				borderWidth: '2px',
				borderColor: author ? 'red' : 'green',
				borderStyle: 'solid'
			} }>
				<div>author { author || 'Это я НАПИСАЛ' }</div>
				<p>{ body }</p>
				<span>{ JSON.stringify(timestamp) }</span>
			</li>
	);

};

const MessagesList = ({messages}) => {
	return (
			<ol>
				{
					messages ? messages.map(
							(msg, index) => ( <MessageItem key={ index } { ...msg }/> )) :
							( <li>Select chat</li> )
				}

			</ol>
	);
};

export default MessagesList;