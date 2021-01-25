import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import {
  $bgBlue,
  $bgGray,
  $bgRed,
  $blue2,
  $borderBlue,
  $borderGray2,
  $borderGrayLight2,
  $borderRed,
  $gray,
  $red,
  $white,
} from '@caddijp/colors';
import React, { ComponentProps, FC } from 'react';
import styled from 'styled-components';

type ButtonType = 'primary' | 'danger' | 'default' | 'text';

interface BaseProps extends Omit<ComponentProps<typeof BaseWrapper>, 'type'> {
  type?: ButtonType;
  isLoading?: boolean;
}

interface ButtonProps extends BaseProps {
  filled?: boolean;
  bordered?: boolean;
}

const BaseWrapper = styled.button<{ disabled?: boolean; isLoading?: boolean }>`
  padding: 4px 16px;
  text-align: center;
  cursor: pointer;
  background: ${$white};
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

const BaseButton: FC<Omit<ButtonProps, 'type'>> = ({ onClick, children, ...props }) => (
  <BaseWrapper onClick={props.disabled ? void 0 : onClick} {...props}>
    {children}
    {props.isLoading && <LoadingOutlined />}
  </BaseWrapper>
);

const PrimaryButton = styled(BaseButton)<{
  filled?: boolean;
  bordered?: boolean;
}>`
  color: ${({ filled, bordered }) => (filled || !bordered ? $white : $blue2)};
  background: ${({ filled, bordered }) => (filled || !bordered ? $bgBlue : $white)};
  border: 1px solid ${({ filled, bordered }) => (filled || !bordered ? $borderBlue : $white)};
`;

const DangerButton = styled(BaseButton)<{
  filled?: boolean;
  bordered?: boolean;
}>`
  color: ${({ filled, bordered }) => (filled || !bordered ? $white : $red)};
  background: ${({ filled, bordered }) => (filled || !bordered ? $bgRed : $white)};
  border: 1px solid ${({ filled, bordered }) => (filled || !bordered ? $borderRed : $white)};
`;

const DefaultButton = styled(BaseButton)<{
  filled?: boolean;
  bordered?: boolean;
}>`
  color: ${({ filled, bordered }) => (filled || !bordered ? $white : $gray)};
  background: ${({ filled, bordered }) => (filled || !bordered ? $bgGray : $white)};
  border: 1px solid
    ${({ filled, bordered }) => (filled || !bordered ? $borderGray2 : $borderGrayLight2)};
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
  color: ${$blue2};
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

const TextButton: FC<Omit<TextButtonProps, 'type'>> = ({ onClick, children, ...props }) => (
  <StyledTextButton onClick={props.disabled ? void 0 : onClick} {...props}>
    {children}
  </StyledTextButton>
);

const Button: FC<ButtonProps | TextButtonProps> = ({ type, ...props }) => {
  switch (type) {
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
export type { ButtonProps, TextButtonProps };
