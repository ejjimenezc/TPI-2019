import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import FormB from './FormB';
import { object } from 'prop-types';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
  },
}));

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
      return {"name":key, "response": data[key]};
    });
    return result;
  }


  async handleSubmit(event) {
    event.preventDefault();
    var serialize = require('form-serialize');
    var data = {};
    var formData = new FormData(event.target);
    Array.from(formData.entries()).forEach(([key, value]) => {
      data[key] = value;
    })
    
    var json_data = JSON.stringify(this.convert_to_list(data));

    if(this.state.stage == 0){
      console.log(json_data)
      try {
        const response = await fetch(this.props.url+'find_categories/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: json_data
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

        const response = await fetch(this.props.url+'best_match/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: json_data
        });
        const json = await response.json();
        if(response.status==201){
          this.setState({stage: 2});
          console.log(json)
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }


  }

  componentDidMount() {
    console.log(this.props.url)
    fetch(this.props.url+'QuestionTypeA')
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
          <React.Fragment>
          <form onSubmit={this.handleSubmit} id="category_form" name="category_form">
            {questions.map(item => (
  
              <React.Fragment key={item.name}>
                <FormB item={item} />
                <br></br>
              </React.Fragment>
  
            ))}
            <button>Send data!</button>
          </form>
        </React.Fragment>
        );
      }else if(this.state.stage==1){return (
        <div className="questions B">
        <form onSubmit={this.handleSubmit}  id="solution_form" name="solution_form">
          {questionsB.map(item => (

          <React.Fragment key={item.name}>
            <FormB item={item}/>
            <br></br>
          </React.Fragment>

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


