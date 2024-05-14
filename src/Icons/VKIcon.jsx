import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function VKIcon(props) {
  return (
    <Svg
      height={20}
      viewBox="0 -120 512.00201 512"
      width={20}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#fff" d="M409.898 153.902L511.695 0H355.578l-2.914 11.293c-7.48 28.992-21.52 68.285-45.914 90.84-3.016 2.785-5.871 5.023-8.5 6.816V0H162.277v30.102h12.703v68.222c-15.242-13.406-34.394-38.988-39.41-84.906L134.105 0H0l4.605 18.656c16.56 67.094 41.399 122.059 73.836 163.367 26.48 33.727 58.02 58.489 93.739 73.594 31.898 13.492 61.27 16.801 82.402 16.801 19.438 0 31.902-2.8 32.95-3.043l11.464-2.672.594-41.351 51.058 44.418h161.356zm-139.484 6.176l-1.164 81.547c-16.809 1.496-50.11 1.555-86.86-14.379-30.69-13.309-57.952-35.101-81.027-64.777-26.425-33.985-47.449-78.45-62.613-132.367h68.777c14.887 86.335 74.782 108.675 77.45 109.625l20.105 7.171V30.102h63.07v116.945l15.836-.828c1.926-.102 19.414-1.496 40.067-19.196 23.465-20.113 41.828-52.683 54.664-96.921h76.976l-83.617 126.41 73.277 83.152h-83.449zm0 0" />
    </Svg>
  );
}

export default VKIcon;
