import React from 'react';
import { css } from 'emotion';

const containerStyle = css`
`;


const Slider = ({ min = 0, max = 100, value = 0, step = 1, onChange }) => (
  <input type="range" min={min} max={max} value={value} step={step} onChange={e => {
    console.log(e.target.value);
    onChange(+e.target.value);
  }} />
);

export default Slider;
