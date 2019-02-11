import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import { withStyles } from '@material-ui/core/styles';

import { getMapKml } from '../utils/KmlReader';
import { withMapContext } from './MapContext';
import MySnackbarContentWrapper from './MySnackbarContentWrapper';

const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit * 4
  },
  content: {}
});

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}

class MapUrlFrom extends Component {
  state = {
    mapUrl:
      'https://www.google.com/maps/d/kml?forcekml=1&mid=1uijK5r96G4IZSlJ_zaI7YiBpfISB6xNk',
    isValidUrl: true,
    snackbar: {
      open: false,
      variant: 'info',
      message: ''
    }
  };

  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCloseSnackbar = this.onCloseSnackbar.bind(this);
    this.showSnackbar = this.showSnackbar.bind(this);
  }

  onCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      ...this.state,
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  }

  showSnackbar(variant, message) {
    this.setState({
      ...this.state,
      snackbar: {
        ...this.state.snackbar,
        open: true,
        variant,
        message
      }
    });
  }

  onInputChange(e) {
    const newMapUrlValue = e.target.value;
    this.setState({
      ...this.state,
      mapUrl: newMapUrlValue,
      isValidUrl: newMapUrlValue !== '' ? validateUrl(newMapUrlValue) : true
    });
  }

  async onFormSubmit(e) {
    e.preventDefault();
    const mapKmlData = await getMapKml(this.state.mapUrl);

    if (mapKmlData.status === 'success') {
      this.props.map.setMapKmlData(mapKmlData.data);
    } else {
      this.props.map.setMapKmlData({});
      this.showSnackbar('error', mapKmlData.message);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={this.state.snackbar.open}
          autoHideDuration={6000}
        >
          <MySnackbarContentWrapper
            onClose={this.onCloseSnackbar}
            variant={this.state.snackbar.variant}
            message={this.state.snackbar.message}
          />
        </Snackbar>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <form onSubmit={this.onFormSubmit}>
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'
              >
                <Grid item xs={12}>
                  <TextField
                    required
                    id='input-map-url'
                    value={this.state.mapUrl}
                    error={!this.state.isValidUrl}
                    onChange={this.onInputChange}
                    label='Your Map URL'
                    helperText='URL of your map (the map has to be public)'
                    className={classes.textField}
                    margin='normal'
                    variant='outlined'
                    fullWidth={true}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                direction='row'
                justify='flex-end'
                alignItems='center'
              >
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    type='submit'
                    disabled={
                      !this.state.isValidUrl || this.state.mapUrl === ''
                    }
                  >
                    Get Map Info
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withMapContext(withStyles(styles)(MapUrlFrom));
