import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface SvgIconProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
}

const MaleIcon = (props: SvgIconProps) => (
  <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
    <Path
      id="Vector"
      d="M20.0001 6.44177V1.89648H15.4548M13.963 7.93164L18.9891 2.90557M4.07101 18.0329C6.83202 20.7944 11.3086 20.7944 14.0702 18.0329C14.7276 17.3771 15.249 16.5979 15.6043 15.7399C15.9597 14.882 16.142 13.9623 16.1408 13.0336C16.142 12.1049 15.9596 11.1852 15.6043 10.3271C15.2489 9.46912 14.7276 8.68976 14.0702 8.03382C11.3086 5.27281 6.83203 5.27281 4.07051 8.03382C1.30949 10.7953 1.31 15.2714 4.07101 18.0329Z"
      stroke="#819AF8"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default MaleIcon;
