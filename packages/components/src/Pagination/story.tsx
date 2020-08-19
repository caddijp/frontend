import { Story } from '@storybook/react';
import { PaginationProps } from 'antd/lib/pagination';
import React from 'react';
import { Pagination } from '.';

// AntdのStyleを読み込めるようになった後にテスト対象に加える
export default {
  title: 'Pagination DontTest',
};

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />;

export const SimplePagination = Template.bind({});

SimplePagination.args = {
  defaultCurrent: 1,
  current: 2,
  total: 50,
};
