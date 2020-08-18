import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Input } from '.';
import type { InputProps } from '.';

export default {
  title: 'Form/Input',
  component: Input,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<InputProps>;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const WithAddonBefore = Template.bind({});
WithAddonBefore.args = {
  addonBefore: 'before',
  placeholder: 'Input with addonBefore',
};

export const WithAddonAfter = Template.bind({});
WithAddonAfter.args = {
  addonAfter: 'after',
  placeholder: 'Input with addonAfter',
};
