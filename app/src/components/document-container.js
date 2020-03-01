import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { FADE_IN_ANIMATION } from "../constants/styles";
import { FONT_SIZE_L, FONT_SIZE_XXL } from "../constants/fonts";
import { BLACK } from "../constants/colors";
import Document from "./document";
import Header from "./common/header";
import Logo from "./common/logo";
import Spinner from "./common/spinner";
import VerticalDivider from "./common/vertical-divider";
import { queryDocument } from "../utils/query";

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

const ErrorText = styled.h1`
  font-size: ${FONT_SIZE_XXL};
  color: ${BLACK};
  ${FADE_IN_ANIMATION}
`;

const DocumentContainer = () => {
  const { documentId } = useParams();
  const [loading, setIsLoading] = React.useState(true);
  const [document, setDocument] = React.useState(null);

  React.useEffect(() => {
    queryDocument(documentId)
      .then(document => {
        setDocument(document.data.share);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [documentId]);

  return (
    <>
      <Header>
        <Logo />
        <VerticalDivider />
        {!loading && document && (
          <HeaderText>{document.version.document.name}</HeaderText>
        )}
      </Header>
      <View>
        {loading && <Spinner />}
        {!loading && document && (
          <Document documentId={documentId} document={document} />
        )}
        {!loading && !document && (
          <ErrorText>{`Unable to load document ${documentId}`}</ErrorText>
        )}
      </View>
    </>
  );
};

export default DocumentContainer;
