import { $blue1, $borderGrayLight2, $grayLight3, $whiteSmoke } from '@caddijp/colors';
import { ComponentProps } from 'react';
import styled from 'styled-components';

export const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  height: auto;
  min-height: 32px;
  padding: 4px 11px;
  overflow: auto;
  font-size: 14px;
  line-height: 1.5715;
  color: rgba(0, 0, 0, 0.65);
  vertical-align: bottom;
  resize: vertical;
  border: 1px solid ${$borderGrayLight2};
  border-radius: 2px;
  font-feature-settings: 'tnum';

  &::placeholder {
    color: ${$grayLight3};
  }

  &:hover {
    border-color: ${$blue1};
    border-right-width: 1px;
  }

  &:focus {
    border-color: ${$blue1};
    border-right-width: 1px;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  &[disabled] {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
    background-color: ${$whiteSmoke};
    opacity: 1;
    &:hover {
      border-color: ${$borderGrayLight2};
    }
  }
`;

export type TextAreaProps = ComponentProps<typeof TextArea>;

export default TextArea;
