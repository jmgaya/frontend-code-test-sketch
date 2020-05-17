import React from "react";
import { queryDocument } from "../utils/query";
import createDocument from "../models/document";

const useDocument = (documentId) => {
  const [document, setDocument] = React.useState();

  React.useEffect(() => {
    queryDocument(documentId).then((document) => {
      setDocument(createDocument(document));
    });
  }, [documentId]);

  return document;
};

export default useDocument;
