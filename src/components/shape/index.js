import React from 'react';
import styled, { css } from 'react-emotion';
import find from 'lodash/find';

const containerStyle = css`
  display: flex;
  flex-direction: column;
`;

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`;

const Row = styled('div')`
  display: flex;
  width: 100%;
`;

const width = (props) => {
  if (props.count > 10) {
    return Math.floor(100/props.count)+'%';
  }
  return '10px';
}

const Cell = styled('div')`
  width: ${width};
  padding-bottom: ${width};
  background-color: ${props => props.value ? 'black': 'white'};
  border: 1px solid grey;
`;

const Shape = ({ name, shape }) => (
  <div className={containerStyle}>
    <label>{name}</label>
    <Container>
      {shape.map(row => (
        <Row>
          {row.map(cell => <Cell value={cell} count={row.length} />)}
        </Row>
      ))}
    </Container>
  </div>
);

export default Shape;
