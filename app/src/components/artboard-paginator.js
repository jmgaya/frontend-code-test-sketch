import React from "react";
import styled from "styled-components";
import Paginator from "./common/paginator";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../assets/arrow-right.svg";
import { getArtboardRoute } from "../utils/routes";

const StyledArrowLeft = styled(ArrowLeft)`
  cursor: pointer;
`;

const StyledArrowRight = styled(ArrowRight)`
  cursor: pointer;
`;

const ArtboardPaginator = ({ documentId, index, documentLength }) => {
  return (
    <Paginator
      index={index + 1}
      length={documentLength}
      disableLeft={index === 0}
      disableRight={index === documentLength - 1}
      left={
        <Link
          to={getArtboardRoute({
            documentId,
            idx: index - 1
          })}
        >
          <StyledArrowLeft />
        </Link>
      }
      right={
        <Link
          to={getArtboardRoute({
            documentId,
            idx: index + 1
          })}
        >
          <StyledArrowRight />
        </Link>
      }
    />
  );
};

export default ArtboardPaginator;
