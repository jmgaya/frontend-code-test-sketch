import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getArtboardRoute } from "../utils/routes";
import { GREY } from "../constants/colors";
import { FONT_SIZE_L } from "../constants/fonts";
import { FADE_IN_ANIMATION } from "../constants/styles";

const View = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  background: transparent;
  padding: 16px;
  ${FADE_IN_ANIMATION}
`;

const ArtboardFigure = styled.figure`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 24px;
`;

const ArtboardImgLayout = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const ArtboardCaption = styled.figcaption`
  text-align: center;
  font-size: ${FONT_SIZE_L};
  padding-top: 16px;
  color: ${GREY};
`;

const Document = ({ document, documentId }) => {
  return (
    <View>
      {document.artboards.map((artboard, idx) => {
        const { files, name } = artboard;
        const thumbnail = files[0].thumbnails[0];
        return (
          <ArtboardFigure key={idx}>
            <ArtboardImgLayout>
              <Link to={getArtboardRoute({ documentId, idx })}>
                <img
                  style={{
                    width: thumbnail.width,
                    height: thumbnail.height
                  }}
                  src={thumbnail.url}
                  alt={name}
                />
              </Link>
            </ArtboardImgLayout>
            <ArtboardCaption key={idx}>{name}</ArtboardCaption>
          </ArtboardFigure>
        );
      })}
    </View>
  );
};

export default Document;
