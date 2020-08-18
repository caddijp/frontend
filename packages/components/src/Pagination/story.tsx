import { Story } from '@storybook/react';
import { PaginationProps } from 'antd/lib/pagination';
import React from 'react';
import { Pagination } from '.';

export default {
  title: 'Pagination',
};

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />;

export const SimplePagination = Template.bind({});

SimplePagination.args = {
  defaultCurrent: 1,
  current: 2,
  total: 50,
};
