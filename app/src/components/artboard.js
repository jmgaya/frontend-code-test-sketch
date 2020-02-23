import React from "react";
import styled from "styled-components";
import { Link, useParams, useHistory } from "react-router-dom";
import { getArtboardRoute } from "../utils/routes";
import { BLACK } from "../constants/colors";
import { FONT_SIZE_L } from "../constants/fonts";
import { FADE_IN_ANIMATION } from "../constants/styles";
import Header from "./common/header";
import Spinner from "./common/spinner";
import Paginator from "./common/paginator";
import { ReactComponent as CloseIcon } from "../assets/close-icon.svg";
import { queryDocument } from "../utils/query";
import { getDocumentRoute } from "../utils/routes";

const HeaderText = styled.h1`
  margin-left: 16px;
  font-size: ${FONT_SIZE_L};
  color: ${BLACK};
  ${FADE_IN_ANIMATION}
`;

const View = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  background: transparent;
  padding-top: 80px;
  ${FADE_IN_ANIMATION}
`;

const CenteredView = styled(View)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 80px 16px 16px 16px;
`;

const ArtboardImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Loading = ({ documentId }) => (
  <>
    <Header>
      <Link to={getDocumentRoute(documentId)}>
        <CloseIcon />
      </Link>
    </Header>
    <CenteredView>
      <Spinner />
    </CenteredView>
  </>
);

const sortByWidthAndHeightDesc = (a, b) =>
  a.width + a.height > b.width + b.height ? -1 : 1;

const artboardFitsIntoDocument = ({
  containerWidth,
  containerHeight,
  artboard: { width, height }
}) => containerWidth >= width && containerHeight >= height;

const getArtboardImageSrc = ({ artboard, containerWidth, containerHeight }) => {
  const sortedDescFiles = artboard.files.sort(sortByWidthAndHeightDesc);

  const suitableArtboard = sortedDescFiles.find(artboard =>
    artboardFitsIntoDocument({
      containerWidth,
      containerHeight,
      artboard
    })
  );

  return suitableArtboard
    ? suitableArtboard.url
    : sortedDescFiles[sortedDescFiles.length - 1].url;
};

const Artboard = () => {
  const { documentId, artboardIdx } = useParams();
  const history = useHistory();
  const [loading, setIsLoading] = React.useState(true);
  const [artboard, setArboard] = React.useState(null);
  const [documentLength, setDocumentLength] = React.useState(null);

  React.useEffect(() => {
    queryDocument(documentId).then(document => {
      setDocumentLength(
        document.data.share.version.document.artboards.entries.length
      );
      setArboard(
        document.data.share.version.document.artboards.entries[artboardIdx]
      );
      setIsLoading(false);
    });
  }, [documentId, artboardIdx]);

  const measuredRef = React.useCallback(
    el => {
      if (el !== null && artboard) {
        const image = el.getElementsByTagName("img")[0];
        image.src = getArtboardImageSrc({
          artboard,
          containerWidth: el.offsetWidth,
          containerHeight: el.offsetHeight
        });
      }
    },
    [artboard]
  );

  if (loading) {
    return <Loading documentId={documentId} />;
  } else {
    return (
      <>
        <Header>
          <Link to={getDocumentRoute(documentId)}>
            <CloseIcon />
          </Link>
          <HeaderText>{artboard.name}</HeaderText>
          <Paginator
            index={artboardIdx}
            length={documentLength}
            handleLeftClick={() => {
              setIsLoading(true);
              history.push(
                getArtboardRoute({
                  documentId,
                  idx: parseInt(artboardIdx) - 1
                })
              );
            }}
            handleRightClick={() => {
              setIsLoading(true);
              history.push(
                getArtboardRoute({
                  documentId,
                  idx: parseInt(artboardIdx) + 1
                })
              );
            }}
          />
        </Header>
        <CenteredView ref={measuredRef}>
          <ArtboardImg alt={artboard.name} />
        </CenteredView>
      </>
    );
  }
};

export default Artboard;
