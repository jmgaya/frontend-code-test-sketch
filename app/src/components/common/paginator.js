import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FONT_SIZE_L } from "../../constants/fonts";

const Layout = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
`;

const Index = styled.h1`
  margin-left: 16px;
  font-size: ${FONT_SIZE_L};
`;

const Separator = styled.h2`
  margin-left: 8px;
  margin-right: 8px;
  font-size: ${FONT_SIZE_L};
`;

const Length = styled.h1`
  margin-right: 16px;
  font-size: ${FONT_SIZE_L};
  cursor: pointer;
`;

const Paginator = ({
  index,
  length,
  disableLeft = false,
  disableRight = false,
  left,
  right,
  separator = "/",
}) => (
  <Layout>
    {!disableLeft && left}
    <Index>{index}</Index>
    <Separator>{separator}</Separator>
    <Length>{length}</Length>
    {!disableRight && right}
  </Layout>
);

Paginator.propTypes = {
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  disableLeft: PropTypes.bool,
  disableRight: PropTypes.bool,
  left: PropTypes.element,
  right: PropTypes.element,
  separator: PropTypes.string,
};

export default Paginator;
