import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Inf_basica from './Inf_basica';
import Inf_tecno from './Inf_tecno';
import Resumen from './Resumen';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  base: {
  },
  image: {
    backgroundImage: 'url(https://picsum.photos/1000/2000)',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    padding: theme.spacing(1),

  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    [theme.breakpoints.up(600 + theme.spacing(4) * 4)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
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

const steps = ['Información básica', 'Información tecnológica', 'Tu resumen'];

function getStepContent(step,setShowNext,data, updateData) {
  switch (step) {
    case 0:
      return <Inf_basica data={data} updateData={updateData}/>;
    case 1:
      return <Inf_tecno data={data} setShowNext={setShowNext} updateData={updateData} />;
    case 2:
      return <Resumen data={data}/>;
    default:
      throw new Error('Paso desconocido');
  }
}


export default function Checkout({data,updateData}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [showNext, setShowNext] = React.useState(1);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const reload = () => {
    window.location.reload();
  };


  const show = () => {
    console.log({data})
  };
  return (
      <React.Fragment>
        <div className={classes.root}>
          <AppBar>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Safe House
              </Typography>
              <IconButton aria-label="search" color="inherit">
                <SearchIcon />
              </IconButton>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
      <button onClick={show}>
        Hi
      </button>

        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Información de tu hogar
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Gracias por confiar en nosotros
                  </Typography>
                  <Typography variant="subtitle1">
                    ¿Quiere realizar otra prueba?
                  </Typography>
                  <Box display="flex" justifyContent='center'>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={reload}
                      className={classes.button}
                    >
                      Nueva prueba
                    </Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep,setShowNext,data,updateData)}
                  <div className={classes.buttons}>
                  {showNext != 0 &&
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finalizar' : 'Continuar'}
                      </Button>
                  }
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
  );
}
