import { Story } from '@storybook/react';
import React from 'react';
import { notification, NotificationProps } from '.';
import { Button } from '../Button';

export default {
  title: 'Notification',
  component: Notification,
};

const Template: Story<NotificationProps> = (args) => (
  <Button type="primary" onClick={() => notification.open(args)}>
    Click
  </Button>
);

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  message: 'Success message',
  description: 'Success description',
};

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  message: 'Info message',
  description: 'Info description',
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  message: 'Warning message',
  description: 'Warning description',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  message: 'Error message',
  description: 'Error description',
  duration: 0,
};

export const Default = Template.bind({});
Default.args = {
  type: 'default',
  message: 'Default message',
  description: 'Default description',
};
