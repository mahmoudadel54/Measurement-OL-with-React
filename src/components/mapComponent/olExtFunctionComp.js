import React, { useEffect, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import Tile from "ol/layer/Tile";
import Stamen from 'ol/source/Stamen'
import Draw from 'ol/interaction/Draw'
import { defaults } from 'ol/interaction'
import Tooltip from 'ol-ext/overlay/Tooltip'
import './style.css'
import "ol/ol.css"
import 'ol-ext/dist/ol-ext.min.css'
function MeasureMapCompOlExt() {
  const [map, setMap] = useState();
  const [drawInteraction, setDrawInteraction] = useState();

  //useEffect to intialize map instance
  useEffect(() => {

    // Layers
    var layers = [
      new Tile({
        title: 'terrain-background',
        source: new Stamen({ layer: 'terrain' })
      })
    ];

    // The map
    var map = new Map({
      target: 'map',
      view: new View({
        zoom: 5,
        center: [166326, 5992663]
      }),
      interactions: defaults({ altShiftDragRotate: false, pinchRotate: false }),
      layers: layers
    });

  
    setMap(map)
    //////////////////////
    return () => {
      setMap(null);
    };
  }, []);

  const handleMeasure = (type) => {
  clearMeasure();
  
  switch (type) {
    case 'LineString':
      let tooltipLine = new Tooltip();
      let drawLine = new Draw({ type: 'LineString' });
      map.addInteraction(drawLine);
      // Add a tooltip
      map.addOverlay(tooltipLine);
      // Set feature on drawstart
      drawLine.on('drawstart', tooltipLine.setFeature.bind(tooltipLine));
      // Remove feature on finish
      drawLine.on(['change:active', 'drawend'], tooltipLine.removeFeature.bind(tooltipLine));
      setDrawInteraction(drawLine);
      break;
  case 'Polygon':
    let tooltipPoly = new Tooltip();
    
    let drawPoly = new Draw({ type: 'Polygon' });
      map.addInteraction(drawPoly);
  
      // Add a tooltip
      map.addOverlay(tooltipPoly);
  
      // Set feature on drawstart
      drawPoly.on('drawstart', tooltipPoly.setFeature.bind(tooltipPoly));
      // Remove feature on finish
      drawPoly.on(['change:active', 'drawend'], tooltipPoly.removeFeature.bind(tooltipPoly));
      setDrawInteraction(drawPoly);
      break;
  
      default:
      break;
  }
    

  }

  const clearMeasure = () => {
    // measureLayer.clear();
    drawInteraction && map.removeInteraction(drawInteraction)
  }
  return <><div id="map" >
    <div className="measure-btns">
      <span className="btn btn-primary" onClick={() => handleMeasure('LineString')}>Measure Line</span>
      <span className="btn btn-secondary" onClick={() => handleMeasure('Polygon')}>Measure Polygon </span>
      <span className="btn btn-danger" onClick={clearMeasure}>Clear </span>
    </div>
  </div>
  </>


}

export default MeasureMapCompOlExt;
