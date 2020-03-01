import React from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { DEFAULT_DOCUMENT_ROUTE } from "../constants/routes";
import { FADE_IN_ANIMATION } from "../constants/styles";
import Document from "./document";
import Header from "./common/header";
import Logo from "./common/logo";
import Spinner from "./common/spinner";
import Button from "./common/button";
import { queryDocument } from "../utils/query";

const View = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: transparent;
  padding: 80px 16px 16px 16px;
  ${FADE_IN_ANIMATION}
`;

const ErrorText = styled.h1`
  font-size: 64px;
`;

const Loading = () => (
  <>
    <Header>
      <Logo />
    </Header>
    <View>
      <Spinner />
    </View>
  </>
);

const DocumentContainer = () => {
  const { documentId } = useParams();
  const history = useHistory();
  const [loading, setIsLoading] = React.useState(true);
  const [document, setDocument] = React.useState(null);

  React.useEffect(() => {
    queryDocument(documentId).then(document => {
      setDocument(document.data.share);
      setIsLoading(false);
    });
  }, [documentId]);

  if (loading) {
    return <Loading />;
  } else if (!document) {
    return (
      <>
        <Header>
          <Logo />
        </Header>
        <View>
          <ErrorText>{`🤦‍♂️`}</ErrorText>
          <Button
            handleClick={() => {
              setIsLoading(true);
              history.replace(DEFAULT_DOCUMENT_ROUTE);
            }}
            text="Try with another document"
          />
        </View>
      </>
    );
  } else {
    return <Document documentId={documentId} document={document} />;
  }
};

export default DocumentContainer;
