import React from 'react';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      questions: [],
      responses: {},
      stage: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  convert_to_list(data){
    console.log(data)
    var result = Object.keys(data).map(function(key) {
      return {"question_code":key, "response": parseInt(data[key])};
    });
    return result;
  }


  async handleSubmit(event) {
    event.preventDefault();
    var serialize = require('form-serialize');
    var data = this.convert_to_list(serialize(event.target, { hash: true }));

    try {
      const response = await fetch('http://localhost:8000/test/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      if(response.status==201){
        this.setState({stage: 1});
      }
    } catch (error) {
      console.error('Error:', error);
    }


  }

  componentDidMount() {
    fetch("http://localhost:8000/QuestionTypeA")
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
      if (this.state.stage==0) {
        return (
          <div className="questions">
          <h1>Questions for {this.props.name}</h1>
          <form onSubmit={this.handleSubmit}>
            {questions.map(item => (
  
            <div key={item.code}>
              <label htmlFor={item.code}>{item.question}:</label>
              <p>
              <input type="radio" id={item.code} name={item.code} defaultChecked value="1"></input><label>Yes</label>
              </p>
              <p>
              <input type="radio" id={item.code} name={item.code} value="0"></input><label>No</label>
              </p>
            </div>
  
            ))}
            <button>Send data!</button>
          </form>
        </div>
        );
      }else if(this.state.stage==1){
        return <div>More Questions</div>;
      }else{
        return <div>Loading...</div>;
      }
    }
      
    }
}
  
export default Questions;


