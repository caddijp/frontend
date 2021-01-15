import { $d9d9d9, white } from '@caddijp/colors';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  > div {
    height: 32px;
    padding: 5px 12px;
    font-size: 14px;
    text-align: center;
    background: #fafafa;
    border-top: 1px solid ${$d9d9d9};
    border-bottom: 1px solid ${$d9d9d9};
    &.before {
      border-left: 1px solid ${$d9d9d9};
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    &.after {
      border-right: 1px solid ${$d9d9d9};
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
`;

const StyledInput = styled.input<{
  width?: string;
  hasAddonBefore: boolean;
  hasAddonAfter: boolean;
}>`
  width: ${(props) => props.width ?? '100%'};
  height: 32px;
  background: ${white};
  border: 1px solid ${$d9d9d9};
  border-top-left-radius: ${(props) => (props.hasAddonBefore ? 0 : '2px')};
  border-top-right-radius: ${(props) => (props.hasAddonAfter ? 0 : '2px')};
  border-bottom-right-radius: ${(props) => (props.hasAddonAfter ? 0 : '2px')};
  border-bottom-left-radius: ${(props) => (props.hasAddonBefore ? 0 : '2px')};
  &:disabled {
    cursor: not-allowed;
    background: #fafafa;
  }
`;

interface InputProps
  extends Pick<
    ComponentProps<typeof StyledInput>,
    'width' | 'value' | 'disabled' | 'onChange' | 'onFocus' | 'onBlur' | 'placeholder' | 'className'
  > {
  addonAfter?: string;
  addonBefore?: string;
  customRef?: React.MutableRefObject<null>;
}

const BaseInput: React.FC<InputProps> = (props) => (
  <StyledInput
    width={props.width}
    value={props.value}
    disabled={props.disabled}
    onChange={props.onChange}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    placeholder={props.placeholder}
    type="text"
    hasAddonBefore={!!props.addonBefore}
    hasAddonAfter={!!props.addonAfter}
    ref={props.customRef}
  />
);

const Input: React.FC<InputProps> = (props) => {
  if (!props.addonAfter && !props.addonBefore) {
    return <BaseInput {...props} className={props.className} />;
  }
  return (
    <Wrapper className={props.className}>
      {props.addonBefore && <div className="before">{props.addonBefore}</div>}
      <BaseInput {...props} />
      {props.addonAfter && <div className="after">{props.addonAfter}</div>}
    </Wrapper>
  );
};

export default Input;
export { Input };
export type { InputProps };
