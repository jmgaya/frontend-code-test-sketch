import { DOCUMENT_ROUTE, ARTBOARD_ROUTE } from "../constants/routes";

export const getDocumentRoute = documentId => `${DOCUMENT_ROUTE}/${documentId}`;

export const getArtboardRoute = ({ documentId, idx }) =>
  `${DOCUMENT_ROUTE}/${documentId}${ARTBOARD_ROUTE}/${idx}`;
