import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import ReactModal, { Props as ReactModalProps, Styles as ReactModalStyles } from 'react-modal';
import styled from 'styled-components';

export type ModalProps = ReactModalProps & {
  title?: string;
  footer?: React.ReactNode;
  showCloseIcon?: boolean;
};

const customStyles: ReactModalStyles = {
  /* stylelint-disable selector-type-no-unknown */
  overlay: {
    background: 'rgba(72, 82, 109, 0.2)',
  },
  /* stylelint-enable selector-type-no-unknown */
};

const StyledModal = styled(ReactModal)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 568px;
  max-height: 80vh;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 9px 28px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.12),
    0 6px 16px rgba(0, 0, 0, 0.08);
  transform: translate(-50%, -50%);
`;

const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 55px;
  background: #fff;
  box-shadow: inset 0 -1px 0 #f0f0f0;
`;

const StyledModalTitle = styled.div`
  margin-left: 24px;
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.85);
`;

const StyledCloseButton = styled.button`
  width: 55px;
  height: 55px;
  cursor: pointer;
  background: none;
  border: none;
`;

const StyledModalBody = styled.div`
  max-height: calc(80vh - 100px);
  padding: 24px;
  overflow: scroll;
  background-color: #fff;
`;

const StyledModalFooter = styled.div`
  width: 100%;
  max-height: calc(80vh - 55px);
  background-color: #fff;
  border-radius: 2px;
  box-shadow: inset 0 1px 0 #f0f0f0;
`;

const Modal: React.FC<ModalProps> = ({ title, footer, showCloseIcon = true, ...props }) => {
  return (
    <StyledModal {...props} style={customStyles}>
      <StyledModalHeader>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        {showCloseIcon && (
          <StyledCloseButton onClick={props.onRequestClose}>
            <CloseOutlined />
          </StyledCloseButton>
        )}
      </StyledModalHeader>
      <StyledModalBody>{props.children}</StyledModalBody>
      {footer && <StyledModalFooter>{footer}</StyledModalFooter>}
    </StyledModal>
  );
};

export default Modal;
export { Modal };
