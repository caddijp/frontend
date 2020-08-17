import { Story } from '@storybook/react';
import React from 'react';
import { TextArea, TextAreaProps } from '.';

export default {
  title: 'TextArea',
};

const Template: Story<TextAreaProps> = (args) => <TextArea {...args} />;

export const WithPlaceholder = Template.bind({});

WithPlaceholder.args = {
  placeholder: 'ページIDを入力',
  rows: 4,
};

export const WithValue = Template.bind({});

WithValue.args = {
  defaultValue: 'Some value\nOne more line',
  rows: 4,
};

export const WithHandlers: Story<TextAreaProps> = (args) => {
  return (
    <>
      <TextArea {...args} />
      <p>
        OnChange value: <span id="onchange_value"></span>
      </p>
      <p>
        OnBlur value: <span id="onblur_value"></span>
      </p>
    </>
  );
};

const handler = (spanId: string): React.ChangeEventHandler<HTMLTextAreaElement> => {
  return (event) => {
    const value_label = document.getElementById(spanId);
    if (value_label) value_label.innerText = event.target.value;
  };
};

WithHandlers.args = {
  onChange: handler('onchange_value'),
  onBlur: handler('onblur_value'),
  rows: 4,
};

export const Readonly = Template.bind({});

Readonly.args = {
  value: 'Readonly textarea',
  readOnly: true,
  rows: 4,
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
  rows: 4,
};
