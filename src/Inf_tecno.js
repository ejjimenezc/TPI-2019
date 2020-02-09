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
import Questions from './Questions';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
  },
}));


export default function Inf_tecno(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');

  const handleChange = event => {
    setValue(event.target.value);
  };
  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        La tecnología que deseas tener
      </Typography>
      <br></br>
      <Questions url={process.env.REACT_APP__API_URL} data={props.data} updateData={props.updateData} setShowNext={props.setShowNext}/>
    </React.Fragment>
  );
}
