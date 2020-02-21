import styled from "styled-components";
import { WHITE } from "../../constants/colors";

const Header = styled.div`
  display: flex;
  position: fixed;
  height: 64px;
  width: 100%;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  padding: 0px 0.5rem;
  background: ${WHITE};
`;

export default Header;
