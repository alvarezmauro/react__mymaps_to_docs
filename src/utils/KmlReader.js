import convert from 'xml-js';

/**
 * Get the information of the map specified in the URL
 * ! The map of the URL passed to this function needs to be public
 *
 * @param mapURL URL of the map
 */
export async function getMapKml(mapURL) {
  let mapKmlData;

  try {
    const mapKmlFile = await fetch(mapURL);
    const mapKmlText = await mapKmlFile.text();
    mapKmlData = await fromKmlToJs(mapKmlText);
  } catch (error) {
    mapKmlData = {
      status: 'error',
      message: error,
      data: {}
    };
  }

  return mapKmlData;
}

/**
 * Transform a KML/XML file to an object
 *
 * @param mapKmlText KML/XML of the map
 */
export async function fromKmlToJs(mapKmlText) {
  let mapKmlData = {
    status: 'success',
    message: 'success',
    data: {}
  };

  try {
    let mapKmlObj = convert.xml2json(mapKmlText, { compact: true, spaces: 4 });
    mapKmlObj = JSON.parse(mapKmlObj);
    mapKmlObj = mapKmlObj.kml.Document;

    mapKmlData = {
      status: 'success',
      message: 'success',
      data: mapKmlObj
    };
  } catch (error) {
    mapKmlData = {
      status: 'error',
      message: error,
      data: {}
    };
  }

  return mapKmlData;
}
