import React, { createContext } from 'react';

const defaultValues = {
  mapKmlData: {}
};

const initialiseMapData = data => {
  return Object.assign(defaultValues, data);
};

const MapContext = createContext();

export class MapContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: initialiseMapData(props.defaultContextualHelpValue)
    };
  }

  resetValues = () => {
    this.setState({
      map: initialiseMapData(this.props.defaultContextualHelpValue)
    });
  };

  setValues = values => {
    this.setState({
      map: {
        ...this.state.mapData,
        ...values
      }
    });
  };

  setMapKmlData = mapKmlData => {
    this.setState({
      map: {
        ...this.state.mapData,
        mapKmlData
      }
    });
  };

  render() {
    const { map } = this.state;

    return (
      <MapContext.Provider
        value={{
          map: {
            ...map,
            setValues: this.setValues,
            resetValues: this.resetValues,
            setMapKmlData: this.setMapKmlData
          }
        }}
        children={this.props.children}
      />
    );
  }
}

export const MapConsumer = MapContext.Consumer;

export const withMapContext = WrappedComponent => {
  return class Map extends React.Component {
    static displayName = `withMapContext(${WrappedComponent.displayName ||
      WrappedComponent.name})`;

    render() {
      return (
        <MapContext.Consumer>
          {({ map }) => <WrappedComponent {...this.props} map={map} />}
        </MapContext.Consumer>
      );
    }
  };
};
