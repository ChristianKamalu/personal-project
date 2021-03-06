import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 200,
    margin: 7
  },
  media: {
    height: 200,
  },
});

export default function ListingCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => props.toggleDisplay(props.listing)}>
        <CardMedia
          className={classes.media}
          image={props.listing.image}
          title={props.listing.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.listing.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.listing.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    {/* <CardActions>
      <Button size="small" color="primary">
      Share
      </Button>
      <Button size="small" color="primary">
      Learn More
      </Button>
    </CardActions> */}
    </Card>
  );
}