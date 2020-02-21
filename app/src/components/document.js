import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { BLACK, GREY } from "../constants/colors";
import { FONT_SIZE_L } from "../constants/fonts";
import Header from "./common/header";
import Logo from "./common/logo";
import Spinner from "./common/spinner";
import { queryDocument } from "../utils/query";

const HeaderText = styled.h1`
  margin-left: 16px;
  font-size: ${FONT_SIZE_L};
  color: ${BLACK};
`;

const View = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  background: transparent;
  padding-top: 80px;
`;

const SpinnerView = styled(View)`
  justify-content: center;
  align-items: center;
  height: 100%;
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

const Loading = () => (
  <>
    <Header>
      <Logo />
    </Header>
    <SpinnerView>
      <Spinner />
    </SpinnerView>
  </>
);

const Document = ({ id }) => {
  const { documentId = id } = useParams();
  const [document, setDocument] = React.useState(null);
  React.useEffect(() => {
    queryDocument(documentId).then(document => {
      console.log(document.data.share.version.document);
      setDocument(document.data.share.version.document);
    });
  }, [documentId]);

  return !document ? (
    <Loading />
  ) : (
    <>
      <Header>
        <Logo />
        <HeaderText>{document.name}</HeaderText>
      </Header>
      <View>
        {document.artboards.entries.map(({ name, files }, idx) => {
          const thumbnail = files[0].thumbnails[0];
          return (
            <ArtboardLayout key={idx}>
              <ArtboardImgLayout>
                <img
                  style={{
                    width: thumbnail.width,
                    height: thumbnail.height
                  }}
                  src={thumbnail.url}
                  alt={name}
                />
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
