import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function DecreaseCount(props) {
  return (
    <Svg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M0 19h42v4H0z" />
    </Svg>
  );
}

export default DecreaseCount;
