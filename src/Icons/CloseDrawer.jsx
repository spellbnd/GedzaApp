import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CloseDrawer(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="-0.5 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3 21.32l18-18M3 3.32l18 18"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CloseDrawer;
