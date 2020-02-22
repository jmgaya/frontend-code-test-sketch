import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { BLACK } from "../constants/colors";
import { FONT_SIZE_L } from "../constants/fonts";
import { FADE_IN_ANIMATION } from "../constants/styles";
import Header from "./common/header";
import Logo from "./common/logo";
import Spinner from "./common/spinner";
import VerticalDivider from "./common/vertical-divider";
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

const Loading = () => (
  <>
    <Header />
    <CenteredView>
      <Spinner />
    </CenteredView>
  </>
);

const Artboard = () => {
  const { documentId, artboardIdx } = useParams();
  const [loading, setIsLoading] = React.useState(true);
  const [artboard, setArboard] = React.useState(null);

  React.useEffect(() => {
    queryDocument(documentId).then(document => {
      setArboard(
        document.data.share.version.document.artboards.entries[artboardIdx]
      );
      setIsLoading(false);
    });
  }, [documentId, artboardIdx]);

  if (loading) {
    return <Loading />;
  } else {
    console.log(artboard);
    return (
      <>
        <Header>
          <Logo />
          <VerticalDivider />
          <HeaderText>{artboard.name}</HeaderText>
        </Header>
        <View>
          <img src={artboard.files[0].url} alt={artboard.name} />
        </View>
      </>
    );
  }
};

export default Artboard;
