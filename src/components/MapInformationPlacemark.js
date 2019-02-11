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
    width: 150,
    height: 150
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

  function getDescriptionElement(placemark) {
    if (placemark.description) {
      return placemark.description._text
        ? placemark.description._text
        : placemark.description._cdata;
    } else {
      return '';
    }
  }

  function getCoordinateElement(placemark) {
    if (placemark.Point.coordinates) {
      const coordinateValue = getCoordinatesValues(placemark);
      
      return (
        <Fragment>
          <LocationOn fontSize='inherit' /> Lat: {coordinateValue.lat}, Lng: {coordinateValue.lng}
        </Fragment>
      );
    } else {
      return '';
    }
  }

  function getCoordinates(placemark) {
    const coordinatesValues = getCoordinatesValues(placemark);
    return `${coordinatesValues.lat},${coordinatesValues.lng}`
  }

  function getCoordinatesValues(placemark) {
    if (placemark.Point.coordinates) {
      let coordinateValue = {
        lat: '',
        lng: ''
      }
      let coordinateText = placemark.Point.coordinates._text
        ? placemark.Point.coordinates._text
        : placemark.Point.coordinates._cdata;

      coordinateText = coordinateText.split(',');

      if (coordinateText.length > 0) {
        coordinateValue.lat = coordinateText[1].trim();
        coordinateValue.lng = coordinateText[0].trim();
      }
      return coordinateValue;
    } else {
      return '';
    }
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={`https://maps.googleapis.com/maps/api/staticmap?autoscale=2&size=150x150&maptype=roadmap&key=AIzaSyB0-K4EabO1J3223LQblNbfstkPkbmb04k&format=png&visual_refresh=true&markers=size:small%7Ccolor:0x3998f1%7Clabel:1%7C${getCoordinates(placemark)}`}
        title='Live from space album cover'
      />

      <div className={classes.details}>
        <CardContent className={classes.content}>
          {/* <img
            width='150'
            src={`https://maps.googleapis.com/maps/api/staticmap?autoscale=2&size=150x150&maptype=roadmap&key=AIzaSyB0-K4EabO1J3223LQblNbfstkPkbmb04k&format=png&visual_refresh=true&markers=size:small%7Ccolor:0x3998f1%7Clabel:1%7C${getCoordinates(placemark)}`}
            alt={getName(placemark)}
          /> */}
          <Typography component='h5' variant='h5'>
            {getName(placemark)}
          </Typography>

          <Typography variant='body2' color='textSecondary'>
            {getCoordinateElement(placemark)}
          </Typography>

          <Typography variant='body1'>{getDescriptionElement(placemark)}</Typography>
        </CardContent>
        <div className={classes.controls} />
      </div>
    </Card>
  );
}

export default withStyles(styles, { withTheme: true })(MapInformationPlacemark);
