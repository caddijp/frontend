import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Upload } from '.';
import type { UploadProps } from './interface';

export default {
  title: 'Upload',
  component: Upload,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<UploadProps>;

const Template: Story<UploadProps> = (args) => <Upload {...args} />;

export const Basic = Template.bind({});
