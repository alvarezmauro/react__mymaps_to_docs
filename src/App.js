import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { MapContextProvider } from './components/MapContext';
import MapUrlFrom from './components/MapUrlFrom';

const styles = theme => ({
  root: {
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
    height: '100%',
    overflow: 'auto'
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MapContextProvider>
        <div className={classes.root}>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            spacing={24}
          >
            <Grid item xs={11} sm={10}>
              <MapUrlFrom />
            </Grid>
          </Grid>
        </div>
      </MapContextProvider>
    );
  }
}

export default withStyles(styles)(App);
