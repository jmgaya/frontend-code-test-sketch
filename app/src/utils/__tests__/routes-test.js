import { getDocumentRoute, getArtboardRoute } from "../routes";

const ANY_DOCUMENT_ID = "any-document-id";
const ANY_ARTBOARD_IDX = "0";

test("test getDocumentRoute returns expected route", () => {
  expect(getDocumentRoute(ANY_DOCUMENT_ID)).toBe(
    `/document/${ANY_DOCUMENT_ID}`
  );
});

test("test getArtboardRoute returns expected route", () => {
  expect(
    getArtboardRoute({ documentId: ANY_DOCUMENT_ID, idx: ANY_ARTBOARD_IDX })
  ).toBe(`/document/${ANY_DOCUMENT_ID}/artboard/${ANY_ARTBOARD_IDX}`);
});
