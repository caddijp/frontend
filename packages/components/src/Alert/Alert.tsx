import { CloseCircleFilled, ExclamationCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import React, { ComponentProps, FC } from 'react';
import styled from 'styled-components';

type AlertType = 'error' | 'warning' | 'info';

const Wrapper = styled.div<{ type?: AlertType }>`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 14px;
  text-align: left;
  background-color: ${(props) =>
    props.type === 'info' ? '#e6f7ff' : props.type === 'warning' ? '#fffbe6' : '#fff1f0'};
  border: 1px solid
    ${(props) =>
      props.type === 'info' ? '#69c0ff' : props.type === 'warning' ? '#ffe58f' : '#ffccc7'};
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
    {(type === 'error' || !type) && <CloseCircleFilled style={{ color: '#ff4d4f' }} />}
    {type === 'warning' && <ExclamationCircleFilled style={{ color: '#faad14' }} />}
    {type === 'info' && <InfoCircleFilled style={{ color: '#1890ff' }} />}
    <span className="message">{message}</span>
  </Wrapper>
);

export default Alert;
export { Alert };
