import React from 'react';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      questions: [],
      responses: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var serialize = require('form-serialize');
    var data = serialize(event.target, { hash: true });
    console.log(data);
    var test = [JSON.stringify({
      "question_code": "1",
      "response": 3
      }),
      JSON.stringify({
        "question_code": "1",
        "response": 4
        })];
    console.log(test)

    fetch('http://localhost:8000/test/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: test
    })

  }

  componentDidMount() {
    fetch("http://localhost:8000/question")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            questions: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, questions } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="questions">
        <h1>Questions for {this.props.name}</h1>
        <form onSubmit={this.handleSubmit}>
          {questions.map(item => (
          <div  key={item.code}>
              <label htmlFor={item.code}>{item.question}
                <input id={item.code} type="number" name={item.code} min={item.min_value} max={item.max_value}/>
              </label>
          </div>

          ))}
          <button>Send data!</button>
        </form>
      </div>
      );
    }
  }
}
  
export default Questions;


