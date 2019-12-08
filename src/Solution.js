import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import security from './security.jpeg'; 

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

export default function Solution(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={security}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.solution.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.solution.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {props.solution.brand}
        </Button>
        <Button size="small" color="primary">
          {props.solution.price}
        </Button>
        <Button size="small" color="primary">
          {props.solution.rating}
        </Button>
        <Button size="small" color="primary">
          {props.solution.category}
        </Button>
      </CardActions>
    </Card>
  );
}