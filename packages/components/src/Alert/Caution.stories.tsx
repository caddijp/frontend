import { Meta, Story } from '@storybook/react';
import React, { PropsWithChildren } from 'react';
import { Caution } from '.';
import type { CautionProps } from '.';

type _CautionProps = PropsWithChildren<CautionProps>;

export default {
  title: 'Alert/Caution',
  component: Caution,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<_CautionProps>;

const Template: Story<_CautionProps> = (args) => <Caution {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'Caution',
};
