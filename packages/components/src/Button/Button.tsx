import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import React from 'react';
import styled from 'styled-components';

type ButtonType = 'primary' | 'danger' | 'default' | 'text';

type BaseProps = {
  type?: ButtonType;
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

interface ButtonProps extends BaseProps {
  filled?: boolean;
  bordered?: boolean;
}

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

const PrimaryButton = styled(BaseButton)<{
  filled?: boolean;
  bordered?: boolean;
}>`
  color: ${({ filled, bordered }) => (filled || !bordered ? '#fff' : '#1890ff')};
  background: ${({ filled, bordered }) => (filled || !bordered ? '#1890ff' : '#fff')};
  border: 1px solid ${({ filled, bordered }) => (filled || !bordered ? '#1890ff' : '#fff')};
`;

const DangerButton = styled(BaseButton)<{
  filled?: boolean;
  bordered?: boolean;
}>`
  color: ${({ filled, bordered }) => (filled || !bordered ? '#fff' : '#eb5757')};
  background: ${({ filled, bordered }) => (filled || !bordered ? '#eb5757' : '#fff')};
  border: 1px solid ${({ filled, bordered }) => (filled || !bordered ? '#eb5757' : '#fff')};
`;

const DefaultButton = styled(BaseButton)<{
  filled?: boolean;
  bordered?: boolean;
}>`
  color: ${({ filled, bordered }) => (filled || !bordered ? '#fff' : '#595959')};
  background: ${({ filled, bordered }) => (filled || !bordered ? '#595959' : '#fff')};
  border: 1px solid ${({ filled, bordered }) => (filled || !bordered ? '#595959' : '#d9d9d9')};
`;

interface TextButtonProps extends BaseProps {
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
      return <TextButton {...(props as TextButtonProps)} />;
    case 'primary':
      return <PrimaryButton {...(props as ButtonProps)} />;
    case 'danger':
      return <DangerButton {...(props as ButtonProps)} />;
    case 'default':
    default:
      return <DefaultButton {...(props as ButtonProps)} />;
  }
};

export default Button;
export { Button };
export type { ButtonProps, TextButtonProps };
