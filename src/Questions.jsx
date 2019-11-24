import React from 'react';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      questions: []
    };
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
          console.log(result);
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
        <form>
          {questions.map(item => (
            <div key={item.code}>
              <label >
              {item.question}
              <input type="number" name={item.name} min={item.min_value} max={item.max_value}/>
              </label>
            </div>
          ))}
          <input type="submit" value="Submit" />
        </form>
      </div>
      );
    }
  }
}
  
export default Questions;