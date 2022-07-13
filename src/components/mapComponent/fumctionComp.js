import React, { useEffect, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import Tile from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

import { Draw, Modify } from 'ol/interaction';
import { getCustomStyle, styleFunction } from "./helperFunc";
import "ol/ol.css"
import './style.css'
function MapFuncComponent() {
  const [map, setMap] = useState();
  const [measureLayer, setMeasureLayer] = useState();
  const [drawInteraction, setDrawInteraction] = useState();
  const [modifyInteraction, setModifyInteraction] = useState();

  //useEffect to intialize map instance
  useEffect(() => {
    let view = new View({
      center: [-8609085.956538524, 3013413.2419766407],
      zoom: 10,
    });
    let osmLayer = new Tile({
      source: new OSM(),
    });
    let mapInstance = new Map({
      view: view,
      layers: [osmLayer],
      target: "map",
    });
    window.__map = mapInstance;
    setMap(mapInstance);
    //////////////////////
    return () => {
      setMap(null);
    };
  }, []);

  const handleMeasure = (type) => {

    const segmentStyles = [getCustomStyle('segment')];
    const source = new VectorSource();
    setMeasureLayer(source)
    const vector = new VectorLayer({
      source: source,
      style: function (feature) {
        return styleFunction(feature, true, '', segmentStyles);
      },
    });
    map.addLayer(vector)
    const modify = new Modify({ source: source, style: getCustomStyle('modified') });
    map.addInteraction(modify);
    setModifyInteraction(modify)
    addInteraction(type, source, segmentStyles, modify)

  }
  function addInteraction(drawType, source, segmentStyles, modify) {
    const activeTip =
      'Click to continue drawing the ' +
      (drawType === 'Polygon' ? 'polygon' : 'line');
    const idleTip = 'Click to start measuring';
    let tip = idleTip;
    let draw = new Draw({
      source: source,
      type: drawType,
      style: function (feature) {
        return styleFunction(feature, true, drawType, segmentStyles);
      },
    });
    draw.on('drawstart', function () {
      source.clear();
      modify.setActive(false);
      tip = activeTip;
    });
    draw.on('drawend', function () {
      let modifyStyle = getCustomStyle('modified')
      // modifyStyle.setGeometry(tipPoint);
      modifyStyle.setGeometry();
      modify.setActive(true);
      map.once('pointermove', function () {
        let modifyStyle = getCustomStyle('modified')
        modifyStyle.setGeometry();
      });
      tip = idleTip;
    });
    modify.setActive(true);
    map.addInteraction(draw);
    setDrawInteraction(draw)
  }
const clearMeasure =()=>{
  measureLayer.clear();
      map.removeInteraction(drawInteraction)
      map.removeInteraction(modifyInteraction)
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

export default MapFuncComponent;
