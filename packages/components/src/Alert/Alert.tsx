import { CloseCircleFilled, ExclamationCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import {
  $69c0ff,
  $borderBlue,
  $e6f7ff,
  $ffccc7,
  $ffe58f,
  $fff1f0,
  $fffbe6,
  $orange,
  $red,
} from '@caddijp/colors';
import React, { ComponentProps, FC } from 'react';
import styled from 'styled-components';

type AlertType = 'error' | 'warning' | 'info';

const Wrapper = styled.div<{ type?: AlertType }>`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 14px;
  text-align: left;
  background-color: ${({ type }) =>
    type === 'info' ? $e6f7ff : type === 'warning' ? $fffbe6 : $fff1f0};
  border: 1px solid
    ${({ type }) => (type === 'info' ? $69c0ff : type === 'warning' ? $ffe58f : $ffccc7)};
  border-radius: 2px;

  .message {
    padding-left: 8px;
  }
`;

export interface AlertProps extends Pick<ComponentProps<typeof Wrapper>, 'type' | 'className'> {
  message: string | JSX.Element;
}

const Alert: FC<AlertProps> = ({ type, message, className }) => (
  <Wrapper type={type} className={className}>
    {(type === 'error' || !type) && <CloseCircleFilled style={{ color: $red }} />}
    {type === 'warning' && <ExclamationCircleFilled style={{ color: $orange }} />}
    {type === 'info' && <InfoCircleFilled style={{ color: $borderBlue }} />}
    <span className="message">{message}</span>
  </Wrapper>
);

export default Alert;
export { Alert };
