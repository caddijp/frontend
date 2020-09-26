import { Meta, Story } from '@storybook/react';
import React, { PropsWithChildren } from 'react';
import type { ButtonProps } from '.';
import { Button } from '.';

type _ButtonProps = PropsWithChildren<ButtonProps>;

export default {
  title: 'Button',
  component: Button,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<_ButtonProps>;

const Template: Story<_ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'default button',
  type: 'default',
};

export const DefaultBordered = Template.bind({});
DefaultBordered.args = {
  children: 'default button with border',
  type: 'default',
  bordered: true,
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'primary button',
  type: 'primary',
};

export const PrimaryBordered = Template.bind({});
PrimaryBordered.args = {
  children: 'primary button with border',
  type: 'primary',
  bordered: true,
};

export const Danger = Template.bind({});
Danger.args = {
  children: 'danger button',
  type: 'danger',
};

export const DangerBordered = Template.bind({});
DangerBordered.args = {
  children: 'danger button with border',
  type: 'danger',
  bordered: true,
};

export const Text = Template.bind({});
Text.args = {
  children: 'text button',
  type: 'text',
};
