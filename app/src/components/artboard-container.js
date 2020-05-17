import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import useDocument from "../hooks/use-document";
import Header from "./common/header";
import Spinner from "./common/spinner";
import Artboard from "./artboard";
import ArtboardPaginator from "./artboard-paginator";
import { FADE_IN_ANIMATION } from "../constants/styles";
import { FONT_SIZE_L } from "../constants/fonts";
import { BLACK } from "../constants/colors";
import { ReactComponent as CloseIcon } from "../assets/close-icon.svg";
import { getDocumentRoute } from "../utils/routes";

const SeparatedHeader = styled(Header)`
  justify-content: space-between;
`;

const HeaderText = styled.h1`
  margin-left: 16px;
  font-size: ${FONT_SIZE_L};
  color: ${BLACK};
  ${FADE_IN_ANIMATION}
`;

const View = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  padding: 80px 16px 16px 16px;
  ${FADE_IN_ANIMATION}
`;

const ArtboardContainer = () => {
  const { documentId, artboardIdx } = useParams();
  const artboardIndex = Number.parseInt(artboardIdx);
  const document = useDocument(documentId);
  const artboard = document ? document.artboards[artboardIndex] : undefined;

  return (
    <>
      <SeparatedHeader>
        <Link to={getDocumentRoute(documentId)}>
          <CloseIcon />
        </Link>
        {artboard && <HeaderText>{artboard.name}</HeaderText>}
        {artboard && (
          <ArtboardPaginator
            documentId={documentId}
            index={artboardIndex}
            documentLength={document.artboards.length}
          />
        )}
      </SeparatedHeader>
      <View>
        {!artboard && <Spinner />}
        {artboard && <Artboard artboard={artboard} />}
      </View>
    </>
  );
};

export default ArtboardContainer;
