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

export const Primary = Template.bind({});
Primary.args = {
  children: 'primary button',
  type: 'primary',
};

export const Text = Template.bind({});
Text.args = {
  children: 'text button',
  type: 'text',
};
