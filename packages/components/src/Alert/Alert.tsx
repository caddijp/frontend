import { CloseCircleFilled, ExclamationCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

type AlertType = 'error' | 'warning' | 'info';

interface AlertProps {
  type?: AlertType;
  message: string | JSX.Element;
  className?: string;
}

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

const Alert: React.FC<AlertProps> = ({ type, message, className }) => {
  return (
    <Wrapper type={type} className={className}>
      {(type === 'error' || !type) && <CloseCircleFilled style={{ color: '#ff4d4f' }} />}
      {type === 'warning' && <ExclamationCircleFilled style={{ color: '#faad14' }} />}
      {type === 'info' && <InfoCircleFilled style={{ color: '#1890ff' }} />}
      <span className="message">{message}</span>
    </Wrapper>
  );
};

export default Alert;
export { Alert };
export type { AlertProps };
