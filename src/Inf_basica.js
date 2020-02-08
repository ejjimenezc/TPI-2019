import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';


function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}


const useStyles = makeStyles({
  option: {
    fontSize: 20,
    '& > span': {
      marginRight: 10,
      fontSize: 20,
    },
  },
});

export default function Inf_basica({ data }) {
  const classes = useStyles();
  const defaultProps = {
    options: tipos_casas,
    getOptionLabel: option => option.title,
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Información básica para tu solución
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nombre"
            name="nombre"
            label="Nombre"
            fullWidth
            value={data.basic.nombre}
            autoComplete="nombre"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="apellido"
            name="apellido"
            label="Apellido"
            fullWidth
            value={data.basic.apellido}
            autoComplete="apellido"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ciudad"
            name="ciudad"
            label="Ciudad"
            fullWidth
            value={data.basic.ciudad}
            autoComplete="ciudad"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="localidad"
            name="localidad"
            label="Localidad"
            fullWidth
            value={data.basic.localidad}
            autoComplete="localidad"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          required
            id="barrio"
            name="barrio"
            label="Barrio"
            fullWidth
            value={data.basic.barrio}
            autoComplete="barrio"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="direccion"
            name="direccion"
            label="Dirección"
            fullWidth
            value={data.basic.direccion}
            autoComplete="direccion"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="presupuesto"
            name="presupuesto"
            label="Ingresa su presupuesto"
            fullWidth
            value={data.basic.presupuesto}
            autoComplete="presupuesto"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="tamano"
            name="tamano"
            label="El tamaño de tu hogar"
            fullWidth
            value={data.basic.tamano}
            autoComplete="tamano"
          />
        </Grid>
        <Grid item xs={12}>
        <Autocomplete
          {...defaultProps}
          id="selccion-tipo-casa"
          style={{ width: 260 }}
          autoHighlight
          renderInput={params => (
            <TextField
              {...params}
              label="Elige tu tipo de hogar"
              variant="outlined"
              fullWidth
              inputProps={{
                ...params.inputProps,
                autoComplete: 'disabled', // disable autocomplete and autofill
              }}
            />
          )}
        />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const tipos_casas = [
  { title: 'Casa' },
  { title: 'Apartamento' },
];
