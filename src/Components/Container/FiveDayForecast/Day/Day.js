import React, {Component} from 'react';

class Day extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <h2>{this.props.day}</h2>
      </div>
    )
  }
}

export default Day;
