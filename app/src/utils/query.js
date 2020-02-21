const BASE_URL = "https://graphql.sketch.cloud/api";

const query = document =>
  fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ query: `{ ${document} }` })
  })
    .then(res => res.json())
    .catch(console.error);

export const queryDocument = documentId =>
  query(
    `
      share(shortId: "${documentId}") {
        shortId
        version {
            document {
            name
            artboards {
              entries {
                name
                isArtboard
                files {
                  url
                  height
                  width
                  scale
                  thumbnails {
                    url
                    height
                    width
                  }
                }
              }
            }
          }
        }
      }
    `
  );
