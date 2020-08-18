import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Alert } from '.';
import type { AlertProps } from '.';

export default {
  title: 'Alert/Alert',
  component: Alert,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<AlertProps>;

const Template: Story<AlertProps> = (args) => <Alert {...args} />;

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  message: 'information message',
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  message: 'warning message',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  message: 'error message',
};
