import { useCallback } from "react";
import styled from "styled-components";

import { ResourceKey } from "../../common/localization/resources/resource";
import zIndexes from "../zIndexes";

import GenericButton from "../button/GenericButton";
import useTranslate from "../../hooks/useTranslate";
import colors from "../colors";
import breakpoints from "../breakpoints";

const StyledLayoutWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  background-color: ${colors.primary.dark};

  overflow-y: auto;
  overflow-x: hidden;
`;

const StyledLayoutHeaderWrapper = styled.div`
  text-align: center;
`;

const StyledTopCircle = styled.div`
  position: absolute;
  top: -40%;
  left: -5%;
  width: 110%;
  height: 80%;
  background-color: ${colors.primary.light};
  opacity: 0.75;
  border-radius: 50%;

  @media ${breakpoints.mobile} {
    font-size: 20px;
    top: -30%;
    left: -5%;
    width: 110%;
    height: 60%;
  }
`;

const StyledCurrentPage = styled.h1`
  color: ${colors.grey.light};

  @media ${breakpoints.mobile} {
    font-size: 15px;
  }
`;

const StyledCurrentPageWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;

  margin-left: auto;
  margin-right: auto;
`;

const StyledLanguageChangeButton = styled(GenericButton)`
  position: absolute;
  top: 10px;
  left: 10px;

  background-color: ${colors.primary.dark};

  z-index: ${zIndexes.layout_over};
`;

interface LayoutProps {
  currentPageKey: ResourceKey;
  children?: React.ReactNode;
}

const Layout = ({ children, currentPageKey }: LayoutProps): JSX.Element => {
  const { translate, i18n } = useTranslate();

  const handleLanguageChange = useCallback(() => {
    i18n.changeLanguage(i18n.language === "tr" ? "en" : "tr");
  }, []);
  return (
    <StyledLayoutWrapper>
      <StyledLanguageChangeButton
        onClickHandler={handleLanguageChange}
        buttonText={"layout_change_language_button_text" as ResourceKey}
      />
      <StyledLayoutHeaderWrapper>
        <StyledTopCircle />
        <StyledCurrentPageWrapper>
          <StyledCurrentPage>{translate(currentPageKey)}</StyledCurrentPage>
        </StyledCurrentPageWrapper>
      </StyledLayoutHeaderWrapper>
      {children}{" "}
    </StyledLayoutWrapper>
  );
};

export default Layout;
