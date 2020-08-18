import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Checkbox } from '.';
import type { CheckboxProps } from '.';

export default {
  title: 'Checkbox',
  component: Checkbox,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  args: {},
} as Meta<CheckboxProps>;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Basic = Template.bind({});
