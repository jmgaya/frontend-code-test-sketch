import React from "react";
import styled from "styled-components";
import { FONT_SIZE_L } from "../../constants/fonts";
import { ReactComponent as ArrowLeft } from "../../assets/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/arrow-right.svg";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
`;

const StyledArrowLeft = styled(ArrowLeft)`
  cursor: pointer;
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

const StyledArrowRight = styled(ArrowRight)`
  cursor: pointer;
`;

const Paginator = ({
  index,
  length,
  disableLeft = false,
  disableRight = false,
  handleLeftClick,
  handleRightClick,
  separator = "/"
}) => (
  <Layout>
    {!disableLeft && <StyledArrowLeft onClick={() => handleLeftClick()} />}
    <Index>{index}</Index>
    <Separator>{separator}</Separator>
    <Length>{length}</Length>
    {!disableRight && <StyledArrowRight onClick={() => handleRightClick()} />}
  </Layout>
);

export default Paginator;
