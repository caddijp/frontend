import { $1890ff, $d9d9d9, white, whiteSmoke } from '@caddijp/colors';
import React, { ComponentProps, FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  label {
    display: flex;
    align-items: center;
    color: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.65)')};
  }
`;

const StyledCheckbox = styled.input`
  position: relative;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  cursor: pointer;
  border-collapse: separate;
  background-color: ${white};
  border: 1px solid ${$d9d9d9};
  border-radius: 2px;
  transition: all 0.3s;
  appearance: none;
  &:checked {
    background-color: ${$1890ff};
    border-color: ${$1890ff};
    &::after {
      position: absolute;
      top: 50%;
      left: 22%;
      display: table;
      width: 5.71428571px;
      height: 9.14285714px;
      content: ' ';
      border: 2px solid ${white};
      border-top: 0;
      border-left: 0;
      opacity: 1;
      transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
      transform: rotate(45deg) scale(1) translate(-50%, -50%);
    }
  }
  &:focus {
    outline: 0;
  }
  &:disabled {
    background-color: ${whiteSmoke};
    border-color: #d9d9d9;
    &:checked {
      &::after {
        border: 2px solid rgba(0, 0, 0, 0.25);
        border-top: 0;
        border-left: 0;
      }
    }
  }
`;

interface CheckboxProps
  extends Pick<ComponentProps<typeof Wrapper>, 'className'>,
    Pick<ComponentProps<typeof StyledCheckbox>, 'checked' | 'disabled' | 'onChange'> {}

const Checkbox: FC<CheckboxProps> = (props) => (
  <Wrapper className={props.className} disabled={props.disabled}>
    <label>
      <StyledCheckbox
        type="checkbox"
        checked={props.checked}
        disabled={props.disabled}
        onChange={props.onChange}
      />
      {props.children}
    </label>
  </Wrapper>
);

export default Checkbox;
export { Checkbox };
export type { CheckboxProps };
