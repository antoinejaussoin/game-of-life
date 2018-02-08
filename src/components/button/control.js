import React from 'react';
import styled from 'react-emotion';
import FontAwesome from 'react-fontawesome';

const StyledButton = styled('button')`
  font-size: 1.5rem;
  color: white;
  position: relative;
  border-radius: 50%;
  padding: 5px;
  margin: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: color 0.2s ease, background-color 0.2s ease, transform 0.3s ease;
  background-color: ${props => props.color};
  width: 50px;
  height: 50px;

  :after {
    content: "";
    width: 100%;
    height: 100%;
    border: solid 2px;
    transform: scale(0.8);
    position: absolute;
    top: -2px;
    left: -2px;
    border-radius: 50%;
    transition: all 0.3s ease;
    border-color: ${props => props.color};
  }

  :hover:after {
		transform: scale(1);
		box-shadow: 10px 0 20px rgba(0, 0, 0, 0.19), 6px 0 6px rgba(0, 0, 0, 0.23);
  }

  :hover {
    background-color: transparent;
		transform: rotate(10deg);
		cursor: pointer;
    box-shadow: none;
    color: ${props => props.color};
  }
`;

const ControlButton = ({ label, icon, onClick, disabled, color = '#000' }) => (
  <StyledButton onClick={onClick} title={label} disabled={disabled} color={color}>
    <FontAwesome name={icon} />
  </StyledButton>
)

export default ControlButton;