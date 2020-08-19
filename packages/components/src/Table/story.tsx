import { Story } from '@storybook/react';
import React from 'react';
import { Table, TableProps } from '.';

export default {
  title: 'Table',
};

const Template: Story<TableProps> = (args) => <Table {...args} />;

export const Basic = Template.bind({});

const columns = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Age',
    key: 'age',
  },
  {
    title: 'Address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

const data = [
  {
    name: <a href="#">John Brown</a>,
    age: 32,
    address: 'New York No. 1 Lake Park',
    action: <button>Delete</button>,
  },
  {
    name: <a href="#">Jim Green</a>,
    age: 42,
    address: 'London No. 1 Lake Park',
    action: <button>Delete</button>,
  },
  {
    name: <a href="#">Joe Black</a>,
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    action: '',
  },
];

Basic.args = {
  columns,
  data,
};
