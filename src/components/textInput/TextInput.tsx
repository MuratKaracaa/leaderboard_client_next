import {
  ChangeEventHandler,
  FormEventHandler,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from "react";
import styled from "styled-components";

import { ResourceKey } from "../../common/localization/resources/resource";

import colors from "../colors";
import breakpoints from "../breakpoints";

import useTranslate from "../../hooks/useTranslate";

interface StyledTextFieldProps {
  isInValid: boolean;
}

const StyledTextField = styled.input<StyledTextFieldProps>`
  width: 100%;

  padding: 16px;

  border: ${({ isInValid }) => (isInValid ? "1px solid red" : "none")};
  border-radius: 8px;

  background-color: ${colors.primary.main};
  color: ${colors.grey.light};

  @media ${breakpoints.mobile} {
    padding: 8px;
    font-size: 10px;
  }
`;

interface TextInputProps {
  type: InputHTMLAttributes<unknown>["type"];
  placeHolderKey?: ResourceKey;
  required?: boolean;
}

const TextInput = (
  { type, required, placeHolderKey }: TextInputProps,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const { translate } = useTranslate();

  const resetComponent = () => {
    if (isInvalid) {
      setValue("");
      setIsInvalid(false);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleOnInvalid: FormEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setIsInvalid(true);
  };
  return (
    <StyledTextField
      type={type}
      ref={ref}
      placeholder={placeHolderKey ? translate(placeHolderKey) : ""}
      required={required}
      onChange={handleChange}
      onInvalid={handleOnInvalid}
      onFocus={resetComponent}
      value={value}
      autoComplete="off"
      isInValid={isInvalid}
    />
  );
};

export default forwardRef(TextInput);
