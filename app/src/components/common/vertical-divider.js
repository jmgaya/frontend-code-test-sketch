import styled from "styled-components";

const VerticalDivider = styled.div`
  width: 1px;
  height: 80%;
  margin: 16px;
  opacity: 0.08;
  background-image: linear-gradient(
    -180deg,
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 0.65) 32%,
    rgb(0, 0, 0) 50%,
    rgba(0, 0, 0, 0.65) 68%,
    rgba(0, 0, 0, 0) 90%
  );
`;

export default VerticalDivider;
