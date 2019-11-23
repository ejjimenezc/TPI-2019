import React, { Component } from 'react';

class Questions extends React.Component {
    render() {
      return (
        <div className="questions">
          <h1>Questions for {this.props.name}</h1>
          <ul>
            <li>Question #1</li>
            <li>Question #2</li>
            <li>Question #3</li>
          </ul>
        </div>
      );
    }
  }
  
export default Questions;