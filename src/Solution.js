import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { loadCSS } from 'fg-loadcss';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    border: 2,
    maxWidth: 500,
  },
  paper2: {
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function Solution({solution}) {
  const classes = useStyles();

  React.useEffect(() => {
      loadCSS(
        'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
        document.querySelector('#font-awesome-css'),
      );
    }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={solution.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {solution.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {solution.description}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs>
                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                      {solution.brand}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                      {solution.rating} - 
                      <Icon className="fas fa-star" fontSize="small" color="secondary"/> 
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                      {solution.category}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">${solution.price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}