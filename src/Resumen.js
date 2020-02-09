import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const personas = [
  { name: 'Visual y auditivo', desc: 'Tipo de monitoreo', price: 'Pregunta 1' },
  { name: 'Inalámbrico', desc: 'Preferencia de cables', price: 'Pregunta 2' },
  { name: 'Silecionsa', desc: 'Tipo de alarma', price: 'Pregunta 3' },
  { name: 'Automatizado', desc: 'Característica general del sistema', price: 'Pregunta 4' },
  { name: 'Voz', desc: 'Complemento método de acceso al lugar', price: 'Pregunta 5' },
];
const addresses = ['Calle falsa # 12-34', 'Tunal', 'Tunjuelito', 'Bogotá D.C.'];
const payments = [
  { name: 'Presupuesto:', detail: '$1.240.000 COP' },
  { name: 'tamaño del hogar en metros cuadrados:', detail: '80' },
  { name: 'Número de plantas', detail: '2' },
  { name: 'Número de habitaciones', detail: '6' },
];

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({data}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tu resumen
      </Typography>
      <List disablePadding>
        {data.results.map(product => (
          <ListItem className={classes.listItem} key={product.id}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Información básica del usuario
          </Typography>
          <Typography gutterBottom>{data.basic.nombre + ' ' + data.basic.apellido}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
