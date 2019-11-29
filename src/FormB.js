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

import Slider from '@material-ui/core/Slider';

import Input from '@material-ui/core/Input';


class FormB extends React.Component {


  
  render() {
    var data = this.props.item;
    if(data.question_type=="INT"){
      return  <React.Fragment>
      <Grid item xs={12} md={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{data.question}</FormLabel>
          <Input name={data.code}
            margin="dense"
            inputProps={{
              defaultValue: data.min_value,
              min: data.min_value,
              max: data.max_value,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </FormControl>
      </Grid>
    </React.Fragment>
    }else if(data.question_type=="BOOLEAN"){
      var choices = data.boolean_choice.split(',');
      return  <React.Fragment>
                <Grid item xs={12} md={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">{data.question}</FormLabel>
                    <RadioGroup aria-label="tipo_moni" name={data.code}>
                      <FormControlLabel
                        value="1"
                        control={<Radio color="primary" />}
                        label={choices[0]}
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio color="primary" />}
                        label={choices[1]}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </React.Fragment>
    }else if(data.question_type=="MULTIPLE"){
      var choices = data.multiple_choice.split(',');
      return  <React.Fragment>
                <Grid item xs={12} md={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">{data.question}</FormLabel>
                    <RadioGroup aria-label="tipo_moni" name={data.code}>
                    {choices.map(item => (
                      <FormControlLabel key={item}
                      value={item}
                      control={<Radio color="primary" />}
                      label={item}
                      />
                    ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </React.Fragment>
      
    }
    return <div>{data.code}</div>;
  }
}
  
export default FormB;