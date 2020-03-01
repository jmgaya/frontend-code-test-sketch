import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Header from "./common/header";
import Spinner from "./common/spinner";
import Artboard from "./artboard";
import ArtboardPaginator from "./artboard-paginator";
import { FADE_IN_ANIMATION } from "../constants/styles";
import { FONT_SIZE_L } from "../constants/fonts";
import { BLACK } from "../constants/colors";
import { ReactComponent as CloseIcon } from "../assets/close-icon.svg";
import { getDocumentRoute } from "../utils/routes";
import { queryDocument } from "../utils/query";

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
  const artboardIndex = parseInt(artboardIdx);
  const [loading, setIsLoading] = React.useState(true);
  const [artboard, setArtboard] = React.useState(null);
  const [documentLength, setDocumentLength] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true);
  }, [artboardIdx]);

  React.useEffect(() => {
    queryDocument(documentId).then(document => {
      const documentArtboards = document.data.share.version.document.artboards;
      setDocumentLength(documentArtboards.entries.length);
      if (artboardIndex < documentArtboards.entries.length) {
        setArtboard(documentArtboards.entries[artboardIndex]);
        setIsLoading(false);
      }
    });
  }, [documentId, artboardIndex]);

  return (
    <>
      <SeparatedHeader>
        <Link to={getDocumentRoute(documentId)}>
          <CloseIcon />
        </Link>
        {!loading && artboard && <HeaderText>{artboard.name}</HeaderText>}
        {artboard && (
          <ArtboardPaginator
            documentId={documentId}
            index={artboardIndex}
            documentLength={documentLength}
          />
        )}
      </SeparatedHeader>
      <View>
        {loading && <Spinner />}
        {!loading && <Artboard artboard={artboard} />}
      </View>
    </>
  );
};

export default ArtboardContainer;
