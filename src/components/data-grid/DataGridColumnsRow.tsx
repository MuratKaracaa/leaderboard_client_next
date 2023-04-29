import styled from "styled-components";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import colors from "../colors";
import breakpoints from "../breakpoints";

import { ResourceKey } from "../../common/localization/resources/resource";

import useTranslate from "../../hooks/useTranslate";

const StyledDataGridColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 50px;

  background-color: ${colors.primary.lightDark};

  &:hover {
    cursor: grab;
  }

  @media ${breakpoints.mobile} {
    height: 31px;
  }
`;

const StyledSortableItemText = styled.span`
  color: ${colors.grey.darker};

  @media ${breakpoints.mobile} {
    font-size: 10px;
  }
`;

interface DataGridColumnProps {
  value: string;
}

const DataGridColumn = SortableElement<DataGridColumnProps>(
  ({ value }: DataGridColumnProps) => {
    return (
      <StyledDataGridColumnWrapper>
        <StyledSortableItemText>{value}</StyledSortableItemText>
      </StyledDataGridColumnWrapper>
    );
  }
);

const StyledDataGridColumnsRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

export interface Column {
  columnNameKey: ResourceKey;
  dataFieldName: string;
}

interface DataGridColumnsRowProps {
  columns: Array<Column>;
}

const DataGridColumnsRow = SortableContainer<DataGridColumnsRowProps>(
  ({ columns }: DataGridColumnsRowProps) => {
    const { translate } = useTranslate();
    return (
      <StyledDataGridColumnsRowWrapper>
        {columns.map((value, index) => (
          <DataGridColumn
            index={index}
            key={`${value.columnNameKey}-${index}`}
            value={translate(value.columnNameKey)}
          />
        ))}
      </StyledDataGridColumnsRowWrapper>
    );
  }
);

export default DataGridColumnsRow;
