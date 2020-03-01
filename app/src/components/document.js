import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getArtboardRoute } from "../utils/routes";
import { BLACK, GREY } from "../constants/colors";
import { FONT_SIZE_L } from "../constants/fonts";
import { FADE_IN_ANIMATION } from "../constants/styles";
import Header from "./common/header";
import Logo from "./common/logo";
import VerticalDivider from "./common/vertical-divider";

const HeaderText = styled.h1`
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
  padding: 80px 16px 16px 16px;
  ${FADE_IN_ANIMATION}
`;

const ArtboardLayout = styled.div`
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

const ArtboardTitle = styled.h2`
  text-align: center;
  font-size: ${FONT_SIZE_L};
  padding-top: 16px;
  color: ${GREY};
`;

const Document = ({ document, documentId }) => {
  return (
    <>
      <Header>
        <Logo />
        <VerticalDivider />
        <HeaderText>{document.version.document.name}</HeaderText>
      </Header>
      <View>
        {document.version.document.artboards.entries.map((artboard, idx) => {
          const { files, name } = artboard;
          const thumbnail = files[0].thumbnails[0];
          return (
            <ArtboardLayout key={idx}>
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
              <ArtboardTitle key={idx}>{name}</ArtboardTitle>
            </ArtboardLayout>
          );
        })}
      </View>
    </>
  );
};

export default Document;
