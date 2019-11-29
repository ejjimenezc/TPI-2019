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

export default function Inf_tecno() {
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
      <Questions url="http://localhost:8000/"/>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Selecciona el tipo de monitoreo que quisieras:</FormLabel>
            <RadioGroup aria-label="tipo_moni" name="tipo_moni" value={value} onChange={handleChange}>
              <FormControlLabel
                value="auditivo"
                control={<Radio color="primary" />}
                label="Auditivo"
              />
              <FormControlLabel
                value="visual"
                control={<Radio color="primary" />}
                label="Visual"
              />
              <FormControlLabel
                value="ambos"
                control={<Radio color="primary" />}
                label="Ambos"
              />
              <FormControlLabel
                value="otro"
                control={<Radio />}
                label="Otro"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Selecciona tu preferencia con respecto a cables:</FormLabel>
            <RadioGroup aria-label="cables" name="cables" value={value} onChange={handleChange}>
              <FormControlLabel
                value="inalambrica"
                control={<Radio color="primary" />}
                label="Inalámbrica"
              />
              <FormControlLabel
                value="alambrico"
                control={<Radio color="primary" />}
                label="Alámbrica"
              />
              <FormControlLabel
                value="no_pref"
                control={<Radio color="primary" />}
                label="No hay preferencia particular"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender2" value={value} onChange={handleChange}>
              <FormControlLabel
                value="female"
                control={<Radio color="primary" />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={<Radio color="primary" />}
                label="Male"
              />
              <FormControlLabel
                value="other"
                control={<Radio color="primary" />}
                label="Other"
              />
              <FormControlLabel
                value="disabled"
                disabled
                control={<Radio />}
                label="(Disabled option)"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
