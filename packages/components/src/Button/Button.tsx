import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

type ButtonType = 'primary' | 'default';

type ButtonProps = {
  type?: ButtonType;
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const BaseWrapper = styled.button<{ disabled?: boolean; isLoading?: boolean }>`
  padding: 5px 16px;
  text-align: center;
  background: #fff;
  border: 0;
  border-radius: 2px;
  opacity: ${(props) => (props.disabled || props.isLoading ? '.5' : '1')};
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.5;
  }
`;

const BaseButton: React.FC<ButtonProps> = (props) => {
  return (
    <BaseWrapper
      onClick={props.onClick}
      className={props.className}
      disabled={props.disabled}
      isLoading={props.isLoading}
    >
      {props.children}
      {props.isLoading && <LoadingOutlined />}
    </BaseWrapper>
  );
};

const PrimaryButton = styled(BaseButton)`
  color: #fff;
  background: #1890ff;
  border: 1px solid #1890ff;
`;

const DefaultButton = styled(BaseButton)`
  color: #1890ff;
  border: 1px solid #1890ff;
`;

const Button: React.FC<ButtonProps> = (props) => {
  switch (props.type) {
    case 'primary':
      return <PrimaryButton {...props} />;
    case 'default':
    default:
      return <DefaultButton {...props} />;
  }
};

export default Button;
export { Button };
