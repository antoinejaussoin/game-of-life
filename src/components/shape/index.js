import React from 'react';
import styled from 'react-emotion';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  outline: ${props => props.selected ? '3px solid purple': 'none'}
  padding: 3px;
  margin: 5px 0;
`;

const Board = styled('div')`
  display: flex;
  flex-direction: column;
`;

const Row = styled('div')`
  width: 100%;
`;

const width = (props) => {
  if (props.count > 10) {
    return (99/props.count)+'%';
  }
  return '10px';
}

const Cell = styled('div')`
  float: left;
  width: ${width};
  padding-bottom: ${width};
  background-color: ${props => props.value ? 'black': 'white'};
  outline: 1px solid grey;
`;

const Shape = ({ name, shape, selected, onClick }) => (
  <Container onClick={onClick} selected={selected}>
    <label>{name}</label>
    <Board>
      {shape.map((row, index) => (
        <Row key={index}>
          {row.map((cell, index2) => <Cell key={index2} value={cell} count={row.length} />)}
        </Row>
      ))}
    </Board>
  </Container>
);

export default Shape;
