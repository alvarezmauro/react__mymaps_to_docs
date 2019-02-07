import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';

const styles = theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 151
  },
  controls: {
    display: 'flex',
    alignItems: 'left',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

function MapInformationPlacemark(props) {
  const { classes, theme, placemark } = props;

  function getName(placemark) {
    if (placemark.name) {
      return placemark.name._text
        ? placemark.name._text
        : placemark.name._cdata;
    } else {
      return '';
    }
  }

  function getDescription(placemark) {
    if (placemark.description) {
      return placemark.description._text
        ? placemark.description._text
        : placemark.description._cdata;
    } else {
      return '';
    }
  }

  function getCoordinates(placemark) {
    if (placemark.Point.coordinates) {
      const coordinateText = placemark.Point.coordinates._text
        ? placemark.Point.coordinates._text
        : placemark.Point.coordinates._cdata;

      return (
        <Fragment>
          <LocationOn fontSize='inherit' /> {coordinateText}
        </Fragment>
      );
    } else {
      return '';
    }
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image='/static/images/cards/live-from-space.jpg'
        title='Live from space album cover'
      />

      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component='h5' variant='h5'>
            {getName(placemark)}
          </Typography>

          <Typography variant='body2' color='textSecondary'>
            {getCoordinates(placemark)}
          </Typography>

          <Typography variant='body1'>{getDescription(placemark)}</Typography>
        </CardContent>
        <div className={classes.controls} />
      </div>
    </Card>
  );
}

export default withStyles(styles, { withTheme: true })(MapInformationPlacemark);
