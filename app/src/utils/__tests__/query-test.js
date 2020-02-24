import { queryDocument } from "../query";

const ANY_RESPONSE = { document: "any-document" };

const mockFetch = data =>
  jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );

test("queryDocument retrieves expected data", async () => {
  fetch = mockFetch(ANY_RESPONSE);
  const result = await queryDocument("any-document");
  expect(result).toMatchObject(ANY_RESPONSE);
});
