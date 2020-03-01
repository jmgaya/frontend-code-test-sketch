import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useDocument from "../hooks/use-document";
import { FADE_IN_ANIMATION } from "../constants/styles";
import { FONT_SIZE_L } from "../constants/fonts";
import { BLACK } from "../constants/colors";
import Document from "./document";
import Header from "./common/header";
import Logo from "./common/logo";
import Spinner from "./common/spinner";
import VerticalDivider from "./common/vertical-divider";

const View = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  background: transparent;
  padding-top: 64px;
  ${FADE_IN_ANIMATION}
`;

const HeaderText = styled.h1`
  font-size: ${FONT_SIZE_L};
  color: ${BLACK};
  ${FADE_IN_ANIMATION}
`;

const DocumentContainer = () => {
  const { documentId } = useParams();
  const document = useDocument(documentId);

  return (
    <>
      <Header>
        <Logo />
        <VerticalDivider />
        {document && <HeaderText>{document.name}</HeaderText>}
      </Header>
      <View>
        {!document && <Spinner />}
        {document && <Document documentId={documentId} document={document} />}
      </View>
    </>
  );
};

export default DocumentContainer;
