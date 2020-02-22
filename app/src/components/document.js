import React from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { DEFAULT_DOCUMENT_ROUTE } from "../constants/routes";
import { BLACK, GREY } from "../constants/colors";
import { FONT_SIZE_L } from "../constants/fonts";
import { FADE_IN_ANIMATION } from "../constants/styles";
import Header from "./common/header";
import Logo from "./common/logo";
import Spinner from "./common/spinner";
import VerticalDivider from "./common/vertical-divider";
import Button from "./common/button";
import { queryDocument } from "../utils/query";

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
  padding-top: 80px;
  ${FADE_IN_ANIMATION}
`;

const CenteredView = styled(View)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ErrorText = styled.h1`
  font-size: 64px;
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
    <CenteredView>
      <Spinner />
    </CenteredView>
  </>
);

const Document = () => {
  const { documentId } = useParams();
  const history = useHistory();
  const [loading, setIsLoading] = React.useState(true);
  const [document, setDocument] = React.useState(null);

  React.useEffect(() => {
    queryDocument(documentId).then(document => {
      setIsLoading(false);
      setDocument(document.data.share);
    });
  }, [documentId]);

  if (loading) {
    return <Loading />;
  } else if (!document) {
    return (
      <>
        <Header>
          <Logo />
          <VerticalDivider />
          <HeaderText>Unknown</HeaderText>
        </Header>
        <CenteredView>
          <ErrorText>{`🤦‍♂️`}</ErrorText>
          <Button
            handleClick={() => {
              setIsLoading(true);
              history.replace(DEFAULT_DOCUMENT_ROUTE);
            }}
            text="Try with another document"
          />
        </CenteredView>
      </>
    );
  } else {
    return (
      <>
        <Header>
          <Logo />
          <VerticalDivider />
          <HeaderText>{document.version.document.name}</HeaderText>
        </Header>
        <View>
          {document.version.document.artboards.entries.map(
            ({ name, files }, idx) => {
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
            }
          )}
        </View>
      </>
    );
  }
};

export default Document;
