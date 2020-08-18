import { Meta, Story } from '@storybook/react';
import React, { PropsWithChildren } from 'react';
import { Card } from '.';
import type { CardProps } from '.';

type _CardProps = PropsWithChildren<CardProps>;

export default {
  title: 'Card',
  component: Card,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<_CardProps>;

const Template: Story<_CardProps> = (args) => <Card {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'card content',
};
