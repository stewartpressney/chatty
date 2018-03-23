import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component{
    render(){
      const props = this.props;
      console.log(props);
      var messages = props.messages.messages


    return(
      <main className='message'>
      {
        messages.map(message => {
          return (
            <Message
              key={message.id}
              username={message.username}
              content={message.content}
              type = {message.type} />
          )
        })
      }
      </main>
    );
  }
}

export default MessageList;