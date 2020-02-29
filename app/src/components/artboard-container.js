import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Header from "./common/header";
import Spinner from "./common/spinner";
import Artboard from "./artboard";
import { FADE_IN_ANIMATION } from "../constants/styles";
import { ReactComponent as CloseIcon } from "../assets/close-icon.svg";
import { getDocumentRoute } from "../utils/routes";
import { queryDocument } from "../utils/query";

const SeparatedHeader = styled(Header)`
  justify-content: space-between;
`;

const CenteredView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  padding: 80px 16px 16px 16px;
  ${FADE_IN_ANIMATION}
`;

const Loading = ({ documentId }) => (
  <>
    <SeparatedHeader>
      <Link to={getDocumentRoute(documentId)}>
        <CloseIcon />
      </Link>
    </SeparatedHeader>
    <CenteredView>
      <Spinner />
    </CenteredView>
  </>
);

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

  if (loading) {
    return <Loading documentId={documentId} />;
  } else {
    return (
      <Artboard
        artboard={artboard}
        documentId={documentId}
        documentLength={documentLength}
        index={artboardIndex}
      />
    );
  }
};

export default ArtboardContainer;
