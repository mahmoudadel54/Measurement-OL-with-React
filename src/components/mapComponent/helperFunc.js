import {
    Circle as CircleStyle,
    Fill,
    RegularShape,
    Stroke,
    Style,
    Text,
} from 'ol/style'
import { LineString, Point } from 'ol/geom';
import { getArea, getLength } from 'ol/sphere';

export const formatLength = function (line) {
    const length = getLength(line);
    let output;
    if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' km';
    } else {
        output = Math.round(length * 100) / 100 + ' m';
    }
    return output;
};

export const formatArea = function (polygon) {
    const area = getArea(polygon);
    let output;
    if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' km\xB2';
    } else {
        output = Math.round(area * 100) / 100 + ' m\xB2';
    }
    return output;
};

export const getCustomStyle = (type) => {
    let style;
    switch (type) {
        case 'modified':
            style = new Style({
                image: new CircleStyle({
                    radius: 5,
                    stroke: new Stroke({
                        color: 'rgba(0, 0, 0, 0.7)',
                    }),
                    fill: new Fill({
                        color: 'rgba(0, 0, 0, 0.4)',
                    }),
                }),
                text: new Text({
                    text: 'Drag to modify',
                    font: '12px Calibri,sans-serif',
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 1)',
                    }),
                    backgroundFill: new Fill({
                        color: 'rgba(0, 0, 0, 0.7)',
                    }),
                    padding: [2, 2, 2, 2],
                    textAlign: 'left',
                    offsetX: 15,
                }),
            });
            break;
        case 'tip':
            style = new Style({
                text: new Text({
                    font: '12px Calibri,sans-serif',
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 1)',
                    }),
                    backgroundFill: new Fill({
                        color: 'rgba(0, 0, 0, 0.4)',
                    }),
                    padding: [2, 2, 2, 2],
                    textAlign: 'left',
                    offsetX: 15,
                }),
            });

            break;
        case 'label':
            style = new Style({
                text: new Text({
                    font: '14px Calibri,sans-serif',
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 1)',
                    }),
                    backgroundFill: new Fill({
                        color: 'rgba(0, 0, 0, 0.7)',
                    }),
                    padding: [3, 3, 3, 3],
                    textBaseline: 'bottom',
                    offsetY: -15,
                }),
                image: new RegularShape({
                    radius: 8,
                    points: 3,
                    angle: Math.PI,
                    displacement: [0, 10],
                    fill: new Fill({
                        color: 'rgba(0, 0, 0, 0.7)',
                    }),
                }),
            });
            break;
        case 'segment':
            style = new Style({
                text: new Text({
                    font: '12px Calibri,sans-serif',
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 1)',
                    }),
                    backgroundFill: new Fill({
                        color: 'rgba(0, 0, 0, 0.4)',
                    }),
                    padding: [2, 2, 2, 2],
                    textBaseline: 'bottom',
                    offsetY: -12,
                }),
                image: new RegularShape({
                    radius: 6,
                    points: 3,
                    angle: Math.PI,
                    displacement: [0, 8],
                    fill: new Fill({
                        color: 'rgba(0, 0, 0, 0.4)',
                    }),
                }),
            });
            break;
        default:
            style = new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2,
                }),
                image: new CircleStyle({
                    radius: 5,
                    stroke: new Stroke({
                        color: 'rgba(0, 0, 0, 0.7)',
                    }),
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)',
                    }),
                }),
            });
            break;

    }
    return style


}


export function styleFunction(feature, segments, drawType,segmentStyles, tip, modify) {
    let segmentStyle = getCustomStyle('segment');
    const styles = [getCustomStyle('')];
    const geometry = feature.getGeometry();
    const type = geometry.getType();
    let point, label, line;
    if (!drawType || drawType === type) {
      if (type === 'Polygon') {
        point = geometry.getInteriorPoint();
        label = formatArea(geometry);
        line = new LineString(geometry.getCoordinates()[0]);
      } else if (type === 'LineString') {
        point = new Point(geometry.getLastCoordinate());
        label = formatLength(geometry);
        line = geometry;
      }
    }
    if (segments && line) {
      let count = 0;
      line.forEachSegment(function (a, b) {
        const segment = new LineString([a, b]);
        const label = formatLength(segment);
        if (segmentStyles.length - 1 < count) {
          segmentStyles.push(segmentStyle.clone());
        }
        const segmentPoint = new Point(segment.getCoordinateAt(0.5));
        segmentStyles[count].setGeometry(segmentPoint);
        segmentStyles[count].getText().setText(label);
        styles.push(segmentStyles[count]);
        count++;
      });
    }
    if (label) {
        let labelStyle = getCustomStyle('label')
      labelStyle.setGeometry(point);
      labelStyle.getText().setText(label);
      styles.push(labelStyle);
    }
    if (
      tip &&
      type === 'Point' &&
      !modify.getOverlay().getSource().getFeatures().length
    ) {
    //   let tipPoint = geometry;
    let tipStyle = getCustomStyle('tip')
      tipStyle.getText().setText(tip);
      styles.push(tipStyle);
    }
    return styles;
  }