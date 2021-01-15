import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { Caution } from '.';

export default {
  title: 'Alert/Caution',
  component: Caution,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta;

const Template: Story<ComponentProps<typeof Caution>> = (args) => <Caution {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'Caution',
};
