import React from "react";
import styled from "styled-components";
import { WHITE } from "../../constants/colors";

const Touchable = styled.div`
  text-decoration: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 1px 0px;
  font-weight: 500;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: left;
  white-space: nowrap;
  position: relative;
  user-select: none;
  line-height: 1;
  font-size: 0.8125rem;
  min-height: 40px;
  display: flex;
  width: auto;
  color: rgba(0, 0, 0, 0.85);
  background-color: ${WHITE};
  transition: all 0.2s ease 0s;
  padding: 0.25rem 1rem;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.15);
  border-image: initial;
  textdecoration: none;
`;

const Button = ({ text, handleClick }) => (
  <Touchable onClick={handleClick}>{text}</Touchable>
);

export default Button;
