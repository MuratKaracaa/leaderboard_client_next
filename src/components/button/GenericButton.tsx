import { ForwardedRef, MouseEventHandler, forwardRef } from "react";
import styled from "styled-components";

import { ResourceKey } from "../../common/localization/resources/resource";

import colors from "../colors";
import breakpoints from "../breakpoints";

import useTranslate from "../../hooks/useTranslate";

const StyledGenericButtonWrapper = styled.button`
  width: 150px;
  height: 50px;

  border: none;
  border-radius: 8px;
  color: ${colors.grey.main};

  background-color: ${colors.primary.main};

  cursor: pointer;

  @media ${breakpoints.mobile} {
    width: 100px;
    height: 31px;

    font-size: 10px;

    white-space: nowrap;
  }
`;

interface GenericButtonProps {
  buttonText: ResourceKey | string;
  onClickHandler: MouseEventHandler;
  className?: string;
}

const GenericButton = (
  { buttonText, onClickHandler, className }: GenericButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): JSX.Element => {
  const { translate } = useTranslate();
  return (
    <StyledGenericButtonWrapper
      onClick={onClickHandler}
      ref={ref}
      className={className}
    >
      {translate(buttonText as ResourceKey) ?? buttonText}
    </StyledGenericButtonWrapper>
  );
};

export default forwardRef(GenericButton);
