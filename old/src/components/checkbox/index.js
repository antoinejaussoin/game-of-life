import React from 'react';
import { css } from 'emotion';

const containerStyle = css`
  display: flex;
  flex-direction: column;
`;

const Checkbox = ({ label = '', value = false, onChange }) => (
  <div className={containerStyle}>
    <label>{label} {value}</label>
    <input type="checkbox" defaultChecked={value} onClick={e => {
      onChange(e.target.value);
    }} />
  </div>
);

export default Checkbox;
