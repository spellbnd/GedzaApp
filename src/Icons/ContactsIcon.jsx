import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ContactsIcon(props) {
  return (
    <Svg
      width={23}
      height={18}
      viewBox="0 0 23 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.927 0H2.355C1.265 0 .375.889.375 1.98v13.204c0 1.088.885 1.98 1.98 1.98h18.572c1.088 0 1.98-.886 1.98-1.98V1.98c0-1.087-.885-1.98-1.98-1.98zm-.273 1.32l-8.971 8.971-9.048-8.97h18.019zM1.694 14.91V2.248l6.36 6.304-6.36 6.358zm.934.934L8.991 9.48l2.23 2.21a.66.66 0 00.93-.002l2.175-2.173 6.328 6.328H2.628zm18.96-.934l-6.329-6.328 6.328-6.328V14.91z"
        fill="#000"
      />
    </Svg>
  );
}

export default ContactsIcon;
