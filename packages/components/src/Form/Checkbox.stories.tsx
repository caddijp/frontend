import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Checkbox } from '.';
import type { CheckboxProps } from '.';

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<CheckboxProps>;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Basic = Template.bind({});

const DisabledTemplate: Story<CheckboxProps> = (args) => <Checkbox {...args} disabled />;

export const Disabled = DisabledTemplate.bind({});
