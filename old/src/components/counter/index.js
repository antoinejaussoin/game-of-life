import React from 'react';
import styled from 'react-emotion';
import { observer } from 'mobx-react';

const Generation = styled('div')`
  font-size: 3em;
`;

const Counter = ({ count }) => (
  <Generation>{count.generation}</Generation>
);

export default observer(Counter);
