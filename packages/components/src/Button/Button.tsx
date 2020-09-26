import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import React from 'react';
import styled from 'styled-components';

type ButtonType = 'primary' | 'danger' | 'default' | 'text';

type ButtonProps = {
  type?: ButtonType;
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const BaseWrapper = styled.button<{ disabled?: boolean; isLoading?: boolean }>`
  padding: 4px 16px;
  text-align: center;
  cursor: pointer;
  background: #fff;
  border: 0;
  border-radius: 2px;
  opacity: ${(props) => (props.disabled || props.isLoading ? '.5' : '1')};
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.5;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const BaseButton: React.FC<ButtonProps> = (props) => {
  return (
    <BaseWrapper
      onClick={props.disabled ? void 0 : props.onClick}
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

const DangerButton = styled(BaseButton)`
  color: #fff;
  background: #eb5757;
  border: 1px solid #eb5757;
`;

const DefaultButton = styled(BaseButton)`
  color: #1890ff;
  border: 1px solid #1890ff;
`;

interface TextButtonProps extends ButtonProps {
  needsBorderLine?: boolean;
  fontSize?: string;
}

const StyledTextButton = styled.button<{
  disabled?: boolean;
  isLoading?: boolean;
  needsBorderLine?: boolean;
  fontSize?: string;
}>`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.fontSize ?? '11px'};
  font-weight: bold;
  color: #3582e5;
  text-decoration: ${(props) => (props.needsBorderLine ? 'underline' : 'none')};
  cursor: pointer;
  background: none;
  border: none;
  opacity: ${(props) => (props.disabled ? '.5' : '1')};
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.5;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
const TextButton: React.FC<TextButtonProps> = (props) => {
  return (
    <StyledTextButton
      onClick={props.disabled ? void 0 : props.onClick}
      className={props.className}
      disabled={props.disabled}
      needsBorderLine={props.needsBorderLine}
      fontSize={props.fontSize}
    >
      {props.children}
    </StyledTextButton>
  );
};

const Button: React.FC<ButtonProps | TextButtonProps> = (props) => {
  switch (props.type) {
    case 'text':
      return <TextButton {...props} />;
    case 'primary':
      return <PrimaryButton {...props} />;
    case 'danger':
      return <DangerButton {...props} />;
    case 'default':
    default:
      return <DefaultButton {...props} />;
  }
};

export default Button;
export { Button };
export type { ButtonProps };
