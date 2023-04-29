import styled from "styled-components";

import colors from "../colors";
import breakpoints from "../breakpoints";

interface StyledGridRowItemTextProps {
  isHighlighted: boolean;
}

interface RowItem {
  value: string;
  isHighlighted: boolean;
}
export type Row = Array<RowItem>;

const StyledGridRowWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  align-self: center;

  width: 100%;
  height: 100%;

  ::before {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 25px 55px 0 0;
    border-color: transparent ${colors.primary.dark};
    right: 0;
    bottom: 0;
    position: absolute;

    @media ${breakpoints.mobile} {
      border-width: 7px 25px 0 0;
    }
  }

  ::after {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 25px 55px 0 0;
    border-color: ${colors.primary.dark} transparent;
    top: 0;
    left: 0;
    position: absolute;

    @media ${breakpoints.mobile} {
      border-width: 7px 25px 0 0;
    }
  }
`;

const StyledGridRowItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  width: 100%;
  height: 50px;

  background-color: ${colors.primary.main};

  @media ${breakpoints.mobile} {
    height: 31px;

    font-size: 10px;
  }
`;

const StyledGridRowItemText = styled.span<StyledGridRowItemTextProps>`
  color: ${({ isHighlighted }) =>
    isHighlighted ? colors.primary.lighter : colors.grey.main};
`;

interface DataGridRowProps {
  row: Row;
}

const DataGridRow = ({ row }: DataGridRowProps): JSX.Element => {
  return (
    <StyledGridRowWrapper>
      {row.map((rowItem, index) => (
        <StyledGridRowItemWrapper key={`${rowItem.value}-${index}`}>
          <StyledGridRowItemText isHighlighted={rowItem.isHighlighted}>
            {rowItem.value}
          </StyledGridRowItemText>
        </StyledGridRowItemWrapper>
      ))}
    </StyledGridRowWrapper>
  );
};

export default DataGridRow;
