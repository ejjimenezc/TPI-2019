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
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import FormB from './FormB';
import FormCategory from './FormCategory';
import Solution from './Solution';
import { object } from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
  },
  marginAutoContainer: {
    width: 500,
    height: 80,
    display: 'flex',
    backgroundColor: 'gold',
  },
  marginAutoItem: {
    margin: 'auto'
  },
  alignItemsAndJustifyContent: {
    width: 500,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));


class Questions extends React.Component {

 
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      categoryQuestions: [],
      responses: {},
      solutionQuestions: [],
      rta: [],
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
          this.setState({solutionQuestions: json});
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
          this.setState({rta: json});
          console.log(json);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }


  }

  componentDidMount() {
    console.log(this.props.url)
    fetch(this.props.url+'CategoryQuestion')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            categoryQuestions: result
          });
          console.log(result)
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
    const { error, isLoaded, categoryQuestions,solutionQuestions, rta } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      if (this.state.stage==0) {
        return (
          <React.Fragment>
          <form onSubmit={this.handleSubmit} id="category_form" name="category_form">
            {categoryQuestions.map(item => (
  
              <React.Fragment key={item.name}>
                <FormCategory item={item}/>
                <br></br>
              </React.Fragment>
  
            ))}
            <Box display="flex" justifyContent='center'>
              <Button variant="contained" type="submit" color="primary">
                Continuar
              </Button>
            </Box>
          </form>
        </React.Fragment>
        );
      }else if(this.state.stage==1){return (
        <div className="solutionQuestions">
        <form onSubmit={this.handleSubmit}  id="solution_form" name="solution_form">
          {solutionQuestions.map(item => (

          <React.Fragment key={item.name}>
            <FormB item={item}/>
            <br></br>
          </React.Fragment>

          ))}
            <Box display="flex" justifyContent='center'>
              <Button variant="contained" type="submit" color="primary">
                Continuar
              </Button>
            </Box>
        </form>
      </div>
      );
      }else{
        this.props.step = 2;
        return <React.Fragment>
          {rta.map(item => (

            <React.Fragment key={item.id}>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={12}>
                  <Solution solution={item}/>
                </Grid>      
              </Grid>
            </React.Fragment>

          ))}
          </React.Fragment>
      }
    }
      
    }
}
  
export default Questions;


