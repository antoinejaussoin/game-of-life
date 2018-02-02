import React from 'react';
import { css } from 'emotion';
import find from 'lodash/find';

const containerStyle = css`
  display: flex;
  flex-direction: column;
`;

const Dropdown = ({ label, options, value, onChange }) => (
  <div className={containerStyle}>
    <label>{label}</label>
    <select name="text" value={value} onChange={e => {
      // console.log(e.target.value);
      const value = e.target.value;
      const option = find(options, { value });
      onChange(option);
    }}>
      {options.map(option => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default Dropdown;
