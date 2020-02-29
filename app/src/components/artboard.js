import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Header from "./common/header";
import Paginator from "./common/paginator";
import { getArtboardRoute } from "../utils/routes";
import { BLACK } from "../constants/colors";
import { FONT_SIZE_L } from "../constants/fonts";
import { FADE_IN_ANIMATION } from "../constants/styles";
import { ReactComponent as CloseIcon } from "../assets/close-icon.svg";
import { getDocumentRoute } from "../utils/routes";

const SeparatedHeader = styled(Header)`
  justify-content: space-between;
`;

const HeaderInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.h1`
  margin-left: 16px;
  font-size: ${FONT_SIZE_L};
  color: ${BLACK};
  ${FADE_IN_ANIMATION}
`;

const ArtboardImageView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: transparent;
  padding: 80px 16px 16px 16px;
  ${FADE_IN_ANIMATION}
`;

const ArtboardImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

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

const Artboard = ({ documentId, documentLength, artboard, index }) => {
  const history = useHistory();

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

  return (
    <>
      <SeparatedHeader>
        <HeaderInformation>
          <Link to={getDocumentRoute(documentId)}>
            <CloseIcon />
          </Link>
          <HeaderText>{artboard.name}</HeaderText>
        </HeaderInformation>
        <Paginator
          index={index + 1}
          length={documentLength}
          disableLeft={index === 0}
          disableRight={index === documentLength - 1}
          handleLeftClick={() => {
            history.push(
              getArtboardRoute({
                documentId,
                idx: index - 1
              })
            );
          }}
          handleRightClick={() => {
            history.push(
              getArtboardRoute({
                documentId,
                idx: index + 1
              })
            );
          }}
        />
      </SeparatedHeader>
      <ArtboardImageView ref={measuredRef}>
        <ArtboardImg alt={artboard.name} />
      </ArtboardImageView>
    </>
  );
};

export default Artboard;
