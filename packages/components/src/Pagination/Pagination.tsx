import { Pagination as AntdPagination } from 'antd';
import { PaginationProps as AntdPaginationProps } from 'antd/lib/pagination';
import React from 'react';
import styled from 'styled-components';

export type PaginationProps = AntdPaginationProps;

const StyledPagination = styled(AntdPagination)``;

const Pagination: React.FC<PaginationProps> = (props) => {
  return <StyledPagination {...props} />;
};

export default Pagination;
export { Pagination };
