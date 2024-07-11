import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface SvgIconProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
}

const MissFoundIcon = (props: SvgIconProps) => (
  <Svg width="10" height="27" fill="none" viewBox="0 0 10 27" {...props}>
    <Path
      d="M6.77904 4.69656L5.00022 15.3723L3.2214 4.69656C3.17873 4.43842 3.19276 4.17409 3.26251 3.92192C3.33226 3.66975 3.45606 3.43577 3.62531 3.23625C3.79457 3.03673 4.00522 2.87643 4.24264 2.76649C4.48007 2.65655 4.73858 2.59961 5.00022 2.59961C5.26186 2.59961 5.52037 2.65655 5.7578 2.76649C5.99522 2.87643 6.20587 3.03673 6.37513 3.23625C6.54438 3.43577 6.66818 3.66975 6.73793 3.92192C6.80768 4.17409 6.82171 4.43842 6.77904 4.69656Z"
      strokeWidth="4.45243"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.0007 24.6C5.78475 24.6 6.42035 23.9644 6.42035 23.1804C6.42035 22.3963 5.78475 21.7607 5.0007 21.7607C4.21665 21.7607 3.58105 22.3963 3.58105 23.1804C3.58105 23.9644 4.21665 24.6 5.0007 24.6Z"
      strokeWidth="2.96829"
    />
  </Svg>
);

export default MissFoundIcon;
