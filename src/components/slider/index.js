import React from 'react';
import { css } from 'emotion';
import debounce from 'lodash/debounce';

const containerStyle = css`
  display: flex;
  flex-direction: column;
`;

const Slider = ({ label = '', min = 0, max = 100, value = 0, step = 1, onChange }) => (
  <div className={containerStyle}>
    <label>{label} {value}</label>
    <input type="range" min={min} max={max} value={value} step={step} onChange={e => {
      onChange(+e.target.value);
    }} />
  </div>
);

export default Slider;
