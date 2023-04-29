import styled from "styled-components";

import loadingGif from "../../assets/gifs/loading.gif";
import breakpoints from "../breakpoints";

const StyledLoadingGif = styled.img`
  position: absolute;
  inset: 0;

  margin: auto;

  @media ${breakpoints.mobile} {
    width: 50px;
    height: 50px;
  }
`;

const Loading = (): JSX.Element => {
  return <StyledLoadingGif src="/loading.gif" />;
};

export default Loading;
