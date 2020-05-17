import React from "react";
import styled from "styled-components";
import { artboard } from "../types";

const ArtboardView = styled.figure`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
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
  artboard: { width, height },
}) => containerWidth >= width && containerHeight >= height;

const getArtboardImageSrc = ({ artboard, containerWidth, containerHeight }) => {
  const sortedDescFiles = artboard.files.sort(sortByWidthAndHeightDesc);

  const suitableArtboard = sortedDescFiles.find((artboard) =>
    artboardFitsIntoDocument({
      containerWidth,
      containerHeight,
      artboard,
    })
  );

  return suitableArtboard
    ? suitableArtboard.url
    : sortedDescFiles[sortedDescFiles.length - 1].url;
};

const Artboard = ({ artboard }) => {
  const measuredRef = React.useCallback(
    (el) => {
      if (el !== null && artboard) {
        const image = el.querySelectorAll("img")[0];
        image.src = getArtboardImageSrc({
          artboard,
          containerWidth: el.offsetWidth,
          containerHeight: el.offsetHeight,
        });
      }
    },
    [artboard]
  );

  return (
    <ArtboardView ref={measuredRef}>
      <ArtboardImg alt={artboard.name} />
    </ArtboardView>
  );
};

Artboard.propTypes = {
  artboard: artboard,
};

export default Artboard;
