import { ForwardedRef, forwardRef } from "react";
import styled from "styled-components";

import { ResourceKey } from "../../common/localization/resources/resource";

import colors from "../colors";

import useTranslate from "../../hooks/useTranslate";
import breakpoints from "../breakpoints";

const StyledButton = styled.button`
  width: 150px;
  height: 47px;

  border: none;
  border-radius: 8px;

  color: ${colors.grey.light};

  background-color: ${colors.primary.main};

  cursor: pointer;

  @media ${breakpoints.mobile} {
    width: 100px;
    height: 31px;

    font-size: 10px;
  }
`;

interface SubmitButtonProps {
  buttonTextKey: ResourceKey;
}

const SubmitButton = (
  { buttonTextKey }: SubmitButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): JSX.Element => {
  const { translate } = useTranslate();
  return (
    <StyledButton type="submit" ref={ref}>
      {translate(buttonTextKey)}
    </StyledButton>
  );
};

export default forwardRef(SubmitButton);
