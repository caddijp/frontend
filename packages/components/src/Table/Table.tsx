import { $grayLight1, $grayLight2 } from '@caddijp/colors';
import React, { ComponentProps, FC } from 'react';
import styled from 'styled-components';

type ColumnsType = { key: string; title: string }[];
type DataType = { [index: string]: string | number | JSX.Element | JSX.Element[] }[];

const StyledTable = styled.table`
  width: 100%;
  text-align: left;
  border-spacing: 0;
  border-collapse: separate;
  border-radius: 2px 2px 0 0;
`;

const StyledTableHead = styled.thead`
  > tr > th {
    position: relative;
    padding: 16px;
    color: rgba(0, 0, 0, 0.85);
    text-align: left;
    overflow-wrap: break-word;
    background: ${$grayLight1};
    border-bottom: 1px solid ${$grayLight2};
    transition: background 0.3s ease;
  }
`;

const StyledTableBody = styled.tbody`
  > tr {
    > td {
      position: relative;
      padding: 16px;
      overflow-wrap: break-word;
      border-bottom: 1px solid ${$grayLight2};
      transition: background 0.3s;
    }

    &:hover {
      background: ${$grayLight1};
    }
  }
`;

const renderHeader = (columns: ColumnsType): JSX.Element[] =>
  columns.map((column) => <th key={column.key}>{column.title}</th>);

const renderBody = (data: DataType, columns: ColumnsType): JSX.Element[] =>
  data.map((data, index) => (
    <tr key={index}>
      {columns.map((column) => (
        <td key={column.key}>{data[column.key]}</td>
      ))}
    </tr>
  ));

export interface TableProps extends Pick<ComponentProps<typeof StyledTable>, 'className'> {
  columns: ColumnsType;
  data: DataType;
}

export const Table: FC<TableProps> = (props) => (
  <StyledTable className={props.className}>
    <StyledTableHead>
      <tr>{renderHeader(props.columns)}</tr>
    </StyledTableHead>
    <StyledTableBody>{renderBody(props.data, props.columns)}</StyledTableBody>
  </StyledTable>
);

export default Table;
