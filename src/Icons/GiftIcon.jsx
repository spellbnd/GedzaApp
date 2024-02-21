import * as React from "react"
import Svg, { Path } from "react-native-svg"

function GiftIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={31}
      height={31}
      viewBox="0 0 31 31"
      fill="none"
      {...props}
    >
      <Path
        d="M27.776 7.544h-3.528c.546-.725.87-1.626.87-2.6A4.34 4.34 0 0020.782.607c-1.44 0-2.502.516-3.341 1.624-.703.926-1.217 2.22-1.86 3.855-.645-1.635-1.159-2.929-1.862-3.855-.84-1.108-1.9-1.624-3.34-1.624a4.34 4.34 0 00-4.335 4.335c0 .975.323 1.876.869 2.601H3.386a2.604 2.604 0 00-2.6 2.6v1.735c0 1.13.724 2.094 1.733 2.452v13.268c0 1.434 1.167 2.601 2.6 2.601h20.923c1.434 0 2.601-1.166 2.601-2.6V14.33a2.605 2.605 0 001.734-2.451v-1.734c0-1.434-1.167-2.601-2.6-2.601zm-10.604-.766c1.329-3.37 1.834-4.436 3.61-4.436 1.435 0 2.602 1.167 2.602 2.601s-1.167 2.601-2.601 2.601h-3.914l.303-.766zM10.38 2.342c1.778 0 2.283 1.066 3.61 4.436l.304.766h-3.914a2.604 2.604 0 01-2.6-2.6c0-1.435 1.166-2.602 2.6-2.602zm1.734 26.124H5.12a.868.868 0 01-.867-.867V14.48h7.86v13.987zm0-15.72H3.386a.868.868 0 01-.867-.867v-1.734c0-.478.389-.867.867-.867h8.727v3.468zm5.202 15.72h-3.468V9.278h3.468v19.188zm9.594-.867a.868.868 0 01-.867.867H19.05V14.48h7.86V27.6zm1.734-15.72a.868.868 0 01-.867.867H19.05V9.278h8.727c.478 0 .867.389.867.867v1.734z"
        fill="#CF191C"
      />
    </Svg>
  )
}

export default GiftIcon;