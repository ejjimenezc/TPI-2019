import React from 'react';

import FormB from './FormB';


class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      questions: [],
      responses: {},
      questionsB: [],
      stage: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  convert_to_list(data){
    var result = Object.keys(data).map(function(key) {
      return {"question_code":key, "response": parseInt(data[key])};
    });
    return result;
  }


  async handleSubmit(event) {
    event.preventDefault();
    var serialize = require('form-serialize');
    var data = this.convert_to_list(serialize(event.target, { hash: true }));
    console.log(event.target);

    if(this.state.stage == 0){
      try {
        const response = await fetch('http://localhost:8000/find_categories/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        const json = await response.json();
        if(response.status==201){
          this.setState({stage: 1});
          this.setState({questionsB: json});
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    else if(this.state.stage == 1){
      try {

        const response = await fetch('http://localhost:8000/best_match/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        const json = await response.json();
        if(response.status==201){
          this.setState({stage: 2});
          console.log(json);
        }
      } catch (error) {
        console.error('Error:', error);
      }
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
    const { error, isLoaded, questions,questionsB } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      if (this.state.stage==0) {
        return (
          <div className="questions">
          <h1>Questions for {this.props.name}</h1>
          <form onSubmit={this.handleSubmit} id="category_form" name="category_form">
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
      }else if(this.state.stage==1){return (
        <div className="questions B">
        <h1>Questions Section B</h1>
        <form onSubmit={this.handleSubmit}  id="solution_form" name="solution_form">
          {questionsB.map(item => (

          <div key={item.code}>
            <FormB item={item}/>
          </div>

          ))}
          <button>Send data!</button>
        </form>
      </div>
      );
      }else{
        return <div>Loading...</div>;
      }
    }
      
    }
}
  
export default Questions;


