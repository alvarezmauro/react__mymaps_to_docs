import React, { Component, Fragment } from 'react';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/LocalPrintshop';
import { withStyles } from '@material-ui/core/styles';

import { withMapContext } from './MapContext';
import MapInformationPlacemark from './MapInformationPlacemark';

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4
  },
  printButton: {
    position: 'absolute',
    bottom: theme.spacing.unit,
    right: theme.spacing.unit
  },
  folder: {
    marginTop: theme.spacing.unit * 3
  },
  placemark: {
    marginTop: theme.spacing.unit * 2
  }
});

class MapInformation extends Component {
  render() {
    const { mapKmlData } = this.props.map;
    const { classes } = this.props;
    console.log(mapKmlData);

    let toReturn = '';
    if (isEmpty(mapKmlData)) {
      toReturn = null;
    } else {
      toReturn = (
        <div className={classes.root}>
          <Grid
            container
            direction='row'
            justify='flex-end'
            alignItems='flex-end'
          >
            <Grid item>
              <Fab color='primary' aria-label='Add' className={classes.printButton}>
                <DeleteIcon />
              </Fab>
            </Grid>
          </Grid>
          <Grid
            container
            direction='row'
            justify='flex-start'
            alignItems='flex-start'
          >
            <Grid item xs={12}>
              <Typography component='h1' variant='h4'>
                {mapKmlData.name._text}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1' color='textSecondary'>
                {mapKmlData.description._text}
              </Typography>
            </Grid>
            {mapKmlData.Folder.map((folder, key) => {
              return (
                <Fragment key={key}>
                  <Grid item xs={12} className={classes.folder}>
                    <Typography component='h3' variant='h6'>
                      {folder.name._text}
                    </Typography>
                  </Grid>
                  {folder.Placemark ? folder.Placemark.map((placemark, key) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        key={key}
                        className={classes.placemark}
                      >
                        <MapInformationPlacemark placemark={placemark} />
                      </Grid>
                    );
                  }) : null}
                </Fragment>
              );
            })}
          </Grid>
        </div>
      );
    }

    return toReturn;
  }
}

export default withMapContext(withStyles(styles)(MapInformation));
