import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function SideNavIcon(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 12 12"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G fill="#fff">
        <Path d="M0.5 5.5H11.5V6.5H0.5z" />
        <Path d="M0.5 2.5H11.5V3.5H0.5z" />
        <Path d="M0.5 8.5H11.5V9.5H0.5z" />
      </G>
    </Svg>
  );
}

export default SideNavIcon;
