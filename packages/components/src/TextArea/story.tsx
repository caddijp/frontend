import { Story } from '@storybook/react';
import React from 'react';
import { TextArea, TextAreaProps } from '.';

export default {
  title: 'TextArea',
};

const Template: Story<TextAreaProps> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});

Default.args = {
  placeholder: 'ページIDを入力',
  rows: 4,
};
