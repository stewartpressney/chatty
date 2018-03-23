import React, {Component} from 'react';

class Notification extends Component {
  render() {
    return (
      <div className="message">
        <span className="message system">
          changed their name to **{this.props.newUsername}**
        </span>
      </div>
    );
  }
}
export default Notification;