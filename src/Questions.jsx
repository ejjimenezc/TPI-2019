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

  convert_to_list(data){
    var result = Object.keys(data).map(function(key) {
      return {"question_code":key, "response": Number(data[key])};
    });
    return result;
  }

  handleSubmit(event) {
    event.preventDefault();
    var serialize = require('form-serialize');
    var data = this.convert_to_list(serialize(event.target, { hash: true }));

    fetch('http://localhost:8000/test/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
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


