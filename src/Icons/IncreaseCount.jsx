import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IncreaseCount(props) {
  return (
    <Svg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M42 19H23V0h-4v19H0v4h19v19h4V23h19z" />
    </Svg>
  )
}

export default IncreaseCount;