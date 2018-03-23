import React, { Component } from 'react';

class ChatBar extends Component {
   constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeUsername= this.changeUsername.bind(this);
    this.state = {
        messages: [],
        user: props.currentUser.name,
        oldUsername: props.currentUser.name,

    };

  };

  handleChange(event){
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //console.log(this.state.value)
    if(event.key ==='Enter'){
      this.props.addMessage(event.target.value);
      this.setState({value: ''})

    // console.log({value: event.target.value});
    }
  }


updateNames(event){
  if(this.state.user !== this.state.oldusername){
      this.state.oldUsername  =  this.state.user
      this.props.userNameChange(this.state.user)
      console.log('old',this.state.oldUsername)
  }
}


  changeUsername(event) {
    if (event.key === 'Enter') {
      console.log('event', event.target.blur)
      this.props.userNameChange(event.target.value)
    }
  }

 render(){
    return(

      <footer className="chatbar">
          <input className="chatbar-username"
                 placeholder="Your Name (Optional)"
                 defaultValue={this.props.currentUser.name}
                 onKeyPress={this.changeUsername}
                 onBlur={this.updateNames}
                 />
          <input className="chatbar-message"
                 placeholder="Type a message and hit ENTER"
                 value={this.state.value}
                 onChange={this.handleChange}
                 onKeyPress={this.handleSubmit}
                 />
      </footer>

    )
  };
};

export default ChatBar;





