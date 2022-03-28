import React from "react";
import styled from "styled-components";

export type TextAreaProps = {
  className?: string;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const TextAreaComponent = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  height: auto;
  min-height: 32px;
  padding: 4px 11px;
  overflow: auto;
  font-size: 14px;
  font-feature-settings: "tnum";
  line-height: 1.5715;
  color: rgba(0, 0, 0, 0.65);
  vertical-align: bottom;
  resize: vertical;
  border: 1px solid #d9d9d9;
  border-radius: 2px;

  &::placeholder {
    color: #bfbfbf;
  }

  &:hover {
    border-color: #40a9ff;
    border-right-width: 1px;
  }

  &:focus {
    border-color: #40a9ff;
    border-right-width: 1px;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  &[disabled] {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
    background-color: #f5f5f5;
    opacity: 1;
    &:hover {
      border-color: #d9d9d9;
    }
  }
`;

const TextArea: React.FC<TextAreaProps> = (props) => {
  return <TextAreaComponent {...props} />;
};

export default TextArea;
export { TextArea };
