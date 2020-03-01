const UNKNOWN_DOCUMENT = {
  name: "Unknown",
  artboards: []
};

const createDocument = document => {
  const errors = document.errors || [];
  if (errors.length > 0) {
    return UNKNOWN_DOCUMENT;
  } else {
    const share = document.data.share;
    return {
      id: share.shortId,
      name: share.version.document.name,
      artboards: share.version.document.artboards.entries
    };
  }
};

export default createDocument;
