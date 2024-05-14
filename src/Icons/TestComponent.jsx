import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function SVGComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="60px"
      height="60px"
      viewBox="0 0 60 60"
      {...props}
    >
      <G id="surface1">
        <Path
          style={{
            fill: 'none',
            strokeWidth: 6.05196,
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            stroke: '#ff0000',
            strokeOpacity: 1,
            strokeMiterlimit: 4,
          }}
          d="M 6.386719 6.419271 C 93.580729 93.613281 93.580729 93.613281 93.580729 93.613281 "
          transform="matrix(0.6,0,0,0.6,0,0)"
        />
        <Path
          style={{
            fill: 'none',
            strokeWidth: 6.802021,
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            stroke: '#ff0000',
            strokeOpacity: 1,
            strokeMiterlimit: 4,
          }}
          d="M 6.386719 93.613281 C 93.828125 6.419271 93.828125 6.419271 93.828125 6.419271 "
          transform="matrix(0.6,0,0,0.6,0,0)"
        />
      </G>
    </Svg>
  );
}
export default SVGComponent;
