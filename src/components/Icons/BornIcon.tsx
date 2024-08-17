import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface SvgIconProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
}

const BornIcon = (props: SvgIconProps) => (
  <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" {...props}>
    <Path
      id="Vector"
      d="M11.4233 0.664373C10.7546 1.33306 10.4081 2.49854 10.6601 3.41113C10.7942 3.89352 10.8158 4.47761 10.4621 4.83221L5.33213 9.96213C4.97753 10.3158 4.39343 10.2942 3.91014 10.1601C2.99844 9.90813 1.83295 10.2546 1.16426 10.9233C0.953703 11.1338 0.786671 11.3837 0.672698 11.6588C0.558725 11.9338 0.500042 12.2286 0.5 12.5263C0.499916 13.1276 0.738694 13.7043 1.16381 14.1295C1.58892 14.5547 2.16554 14.7937 2.76683 14.7938C3.36811 14.7939 3.9448 14.5551 4.37003 14.13C3.94492 14.5552 3.70614 15.1319 3.70623 15.7332C3.70631 16.3344 3.94525 16.9111 4.37048 17.3362C4.79572 17.7613 5.37241 18.0001 5.97369 18C6.57498 17.9999 7.1516 17.7609 7.57671 17.3357C8.24541 16.667 8.59191 15.5015 8.33991 14.589C8.20581 14.1066 8.18421 13.5225 8.53791 13.1679L13.6679 8.03796C14.0225 7.68427 14.6066 7.70587 15.0899 7.83996C16.0016 8.09196 17.167 7.74546 17.8357 7.07677C18.261 6.65167 18.4999 6.07505 18.5 5.47377C18.5001 4.87249 18.2613 4.2958 17.8362 3.87057C17.6257 3.66002 17.3758 3.49299 17.1007 3.37902C16.8257 3.26505 16.5309 3.20636 16.2332 3.20632C15.6319 3.20624 15.0552 3.44501 14.63 3.87012C15.0551 3.4449 15.2939 2.86821 15.2938 2.26693C15.2937 1.66565 15.0547 1.08903 14.6295 0.663923C14.2043 0.238814 13.6276 3.77071e-05 13.0263 0.000122093C12.425 0.000206478 11.8484 0.239145 11.4233 0.664373Z"
    />
  </Svg>
);

export default BornIcon;
