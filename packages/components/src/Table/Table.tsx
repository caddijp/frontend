import React from 'react';
import styled from 'styled-components';

type ColumnsType = { [index: string]: string }[];
type DataType = { [index: string]: string | number | JSX.Element | JSX.Element[] }[];

export type TableProps = {
  columns: ColumnsType;
  data: DataType;
  className?: string;
};

const Wrapper = styled.div`
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  max-width: 100%;
  padding: 0;
  margin: 0;
  clear: both;
  line-height: 1.5715;
  color: rgba(0, 0, 0, 0.65);
  list-style: none;
  background: #fff;
  border-radius: 2px;
  font-feature-settings: 'tnum';
`;

const StyledTable = styled.table`
  width: 100%;
  text-align: left;
  border-spacing: 0;
  border-collapse: separate;
  border-radius: 2px 2px 0 0;
`;

const StyledTableHead = styled.thead`
  & > tr > th {
    position: relative;
    padding: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    text-align: left;
    overflow-wrap: break-word;
    background: #fafafa;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.3s ease;
  }
`;

const StyledTableBody = styled.tbody`
  & > tr {
    & > td {
      position: relative;
      padding: 16px;
      overflow-wrap: break-word;
      border-bottom: 1px solid #f0f0f0;
      transition: background 0.3s;
    }

    &:hover {
      background: #fafafa;
    }
  }
`;

const renderHeader = (columns: TableProps['columns']): JSX.Element[] => {
  return columns.map((column) => <th key={column.key}>{column.title}</th>);
};

const renderBody = (data: TableProps['data'], columns: TableProps['columns']): JSX.Element[] => {
  return data.map((data, index) => {
    return (
      <tr key={index}>
        {columns.map((column) => (
          <td key={column.key}>{data[column.key]}</td>
        ))}
      </tr>
    );
  });
};

const Table: React.FC<TableProps> = (props) => {
  return (
    <Wrapper>
      <StyledTable className={props.className}>
        <StyledTableHead>
          <tr>{renderHeader(props.columns)}</tr>
        </StyledTableHead>
        <StyledTableBody>{renderBody(props.data, props.columns)}</StyledTableBody>
      </StyledTable>
    </Wrapper>
  );
};

export default Table;
export { Table };
