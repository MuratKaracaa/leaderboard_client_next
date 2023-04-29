import {
  KeyboardEventHandler,
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import DataGridColumnsRow, { Column } from "./DataGridColumnsRow";
import DataGridRow, { Row } from "./DataGridRow";

import keyCodes from "../../common/keyCodes";
import { ResourceKey } from "../../common/localization/resources/resource";

import SearchInput from "../searchInput/SearchInput";
import GenericButton from "../button/GenericButton";
import colors from "../colors";
import breakpoints from "../breakpoints";

import useTranslate from "../../hooks/useTranslate";

const StyledDataGridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const StyledTopBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  width: 100%;

  @media ${breakpoints.mobile} {
    gap: 4px;
  }
`;

const StyledGroupHeader = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  align-self: center;

  width: 100%;
  height: 50px;

  color: ${colors.grey.main};

  background-color: ${colors.primary.light};

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
  }
`;

const StyledEmptyStateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  width: 100%;
  height: 50px;

  color: ${colors.grey.main};
  background-color: ${colors.primary.main};

  @media ${breakpoints.mobile} {
    height: 31px;

    font-size: 10px;
  }
`;

interface GroupDataWrapperProps {
  groupedData: Map<string, Array<Row>>;
  filteredGroupData: Map<string, Array<Row>> | null;
}

interface NonGroupedDataWrapper {
  data: Array<Row>;
  filteredData: Array<Row> | null;
}

interface GridData {
  rowData: Array<Row>;
  groupedData: Map<string, Array<Row>>;
}

interface DataGridProps {
  columns: Array<Column>;
  data: Array<Record<any, any>>;
  highlightKeys?: Array<string>;
  highlightExclusionKeys?: Array<string>;
  specifiedRowIndicatorField?: string;
  isGroupable?: boolean;
  groupingFieldName?: string;
  isSearchable?: boolean;
  groupingCriteriaKey?: ResourceKey;
}

const DataGrid = ({
  columns,
  data,
  highlightKeys,
  specifiedRowIndicatorField,
  highlightExclusionKeys,
  groupingFieldName,
  isGroupable,
  isSearchable,
  groupingCriteriaKey,
}: DataGridProps): JSX.Element => {
  const { translate } = useTranslate();

  const [columnState, setColumnState] = useState(columns);

  const [filteredRowState, setFilteredRowState] = useState<Array<Row> | null>(
    null
  );

  const [isGroupEnabled, setIsGroupEnabled] = useState<boolean>(false);

  const [filteredGroupState, setFilteredGroupState] = useState<Map<
    string,
    Array<Row>
  > | null>(null);

  const searchInputRef = useRef() as RefObject<HTMLInputElement>;

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setColumnState(reorderColumns(columnState, oldIndex, newIndex));
  };

  const reorderColumns = (
    array: Array<Column>,
    oldIndex: number,
    newIndex: number
  ) => {
    const result = [...array];
    const [removed] = result.splice(oldIndex, 1);
    result.splice(newIndex, 0, removed);
    return result;
  };

  const filterNonGroupedRows = useCallback(
    (input: string, rows: Array<Row>) => {
      const filtered = rows.filter((data) => {
        const includes = data.some((obj) =>
          obj.value.toUpperCase().includes(input.toUpperCase())
        );
        if (includes) {
          return data;
        }
      });

      return filtered;
    },
    []
  );

  const filterGroupedRows = useCallback(
    (input: string, groupedData: Map<string, Array<Row>>) => {
      const filteredData = new Map<string, Array<Row>>();

      for (const [key, row] of groupedData) {
        for (const rowData of row) {
          const includes = rowData.some((obj) =>
            obj.value.toUpperCase().includes(input.toUpperCase())
          );
          const isKeyEmtpy = !filteredData.get(key);

          if (includes) {
            if (isKeyEmtpy) {
              filteredData.set(key, [rowData]);
            } else {
              const existing = filteredData.get(key) as Array<Row>;
              filteredData.set(key, [...existing, rowData]);
            }
          }
        }
      }

      return filteredData;
    },
    []
  );

  const handleNonGroupSearch: KeyboardEventHandler = (e) => {
    if (e.key === keyCodes.ENTER) {
      const searchInputValue = searchInputRef.current?.value;
      const filtered = filterNonGroupedRows(
        searchInputValue ?? "",
        gridData.rowData
      );
      setFilteredRowState(filtered);
    }
  };

  const handleGroupSearch: KeyboardEventHandler = (e) => {
    if (e.key === keyCodes.ENTER) {
      const searchInputValue = searchInputRef.current?.value;
      const filteredData = filterGroupedRows(
        searchInputValue ?? "",
        gridData.groupedData
      );

      setFilteredGroupState(filteredData);
    }
  };

  const handleGroup = () => {
    setIsGroupEnabled((prev) => !prev);
    if (
      !isGroupEnabled &&
      searchInputRef.current?.value &&
      !filteredGroupState
    ) {
      const filteredGroupData = filterGroupedRows(
        searchInputRef.current.value ?? "",
        gridData.groupedData
      );
      setFilteredGroupState(filteredGroupData);
    }

    if (isGroupEnabled && searchInputRef.current?.value && !filteredRowState) {
      const filteredNonGroupedData = filterNonGroupedRows(
        searchInputRef.current.value ?? "",
        gridData.rowData
      );
      setFilteredRowState(filteredNonGroupedData);
    }
  };

  const handleClear = () => {
    setFilteredGroupState(null);
    setFilteredRowState(null);
  };

  const gridData = useMemo(() => {
    const returnValue: GridData = { rowData: [], groupedData: new Map() };

    for (const datum of data) {
      const nonGroupedRow: Row = [];
      const groupedRow: Row = [];

      for (const key of Object.keys(datum)) {
        const columnIndex = columnState.findIndex(
          (column) => column.dataFieldName === key
        );

        nonGroupedRow[columnIndex] = {
          value: `${datum[key]}`,
          isHighlighted: highlightExclusionKeys?.includes(key)
            ? false
            : datum[specifiedRowIndicatorField as string] ||
              (highlightKeys?.includes(key) as boolean),
        };

        groupedRow[columnIndex] = {
          value: key === groupingFieldName ? "" : `${datum[key]}`,
          isHighlighted: highlightExclusionKeys?.includes(key)
            ? false
            : datum[specifiedRowIndicatorField as string] ||
              (highlightKeys?.includes(key) as boolean),
        };
      }
      const isInMap = returnValue.groupedData.has(
        datum[groupingFieldName as string]
      );

      returnValue.rowData.push(nonGroupedRow);

      if (isInMap) {
        returnValue.groupedData.set(datum[groupingFieldName as string], [
          ...(returnValue.groupedData.get(
            datum[groupingFieldName as string]
          ) as Array<Row>),
          groupedRow,
        ]);
      } else {
        returnValue.groupedData.set(datum[groupingFieldName as string], [
          groupedRow,
        ]);
      }
    }

    return returnValue;
  }, [data, columnState]);

  const GroupedDataWrapper = ({
    groupedData,
    filteredGroupData,
  }: GroupDataWrapperProps): JSX.Element => {
    const dataToDisplay = useMemo(() => {
      return filteredGroupData ? filteredGroupData : groupedData;
    }, [filteredGroupData]);
    return dataToDisplay.size === 0 ? (
      <StyledEmptyStateWrapper>
        {translate("data_grid_empty_state_text")}
      </StyledEmptyStateWrapper>
    ) : (
      <>
        {Array.from(dataToDisplay.keys()).map((key) => {
          return (
            <>
              <StyledGroupHeader key={key}>{key}</StyledGroupHeader>
              {dataToDisplay.get(key)?.map((row, index) => (
                <DataGridRow key={`Grouped ${index}`} row={row} />
              ))}
            </>
          );
        })}
      </>
    );
  };

  const NonGroupedDataWrapper = ({
    data,
    filteredData,
  }: NonGroupedDataWrapper): JSX.Element => {
    const dataToDisplay = useMemo(() => {
      return filteredData ? filteredData : data;
    }, [filteredData]);

    return dataToDisplay.length === 0 ? (
      <StyledEmptyStateWrapper>
        {translate("data_grid_empty_state_text")}
      </StyledEmptyStateWrapper>
    ) : (
      <>
        {dataToDisplay.map((row, index) => (
          <DataGridRow key={`Nongrouped ${index}`} row={row} />
        ))}
      </>
    );
  };
  return (
    <StyledDataGridWrapper>
      <StyledTopBarWrapper>
        {isSearchable && (
          <SearchInput
            handleSearch={
              isGroupEnabled ? handleGroupSearch : handleNonGroupSearch
            }
            handleClear={handleClear}
            ref={searchInputRef}
          />
        )}
        {isGroupable && (
          <GenericButton
            onClickHandler={handleGroup}
            buttonText={
              isGroupEnabled
                ? translate("data_grid_group_toggle_off")
                : translate("data_grid_group_toggle_on", {
                    criteria: translate(groupingCriteriaKey as ResourceKey),
                  })
            }
          />
        )}
      </StyledTopBarWrapper>
      <DataGridColumnsRow
        columns={columnState}
        onSortEnd={onSortEnd}
        axis="x"
      />
      {isGroupEnabled ? (
        <GroupedDataWrapper
          groupedData={gridData.groupedData}
          filteredGroupData={filteredGroupState}
        />
      ) : (
        <NonGroupedDataWrapper
          data={gridData.rowData}
          filteredData={filteredRowState}
        />
      )}
    </StyledDataGridWrapper>
  );
};

export default DataGrid;
