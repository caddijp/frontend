import { PaginationProps as AntdPaginationProps } from 'antd/lib/pagination';
import React from 'react';

export type PaginationProps = AntdPaginationProps;

const Pagination: React.FC<PaginationProps> = (props) => {
  return <Pagination {...props} />;
};

export default Pagination;
export { Pagination };
