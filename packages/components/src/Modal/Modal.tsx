import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import ReactModal, { Props as ReactModalProps, Styles as ReactModalStyles } from 'react-modal';
import styled from 'styled-components';

export interface ModalProps extends ReactModalProps {
  title: string;
  body: JSX.Element;
  footer: JSX.Element;
}

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
  right: auto;
  bottom: auto;
  left: 50%;
  width: 568px;
  max-height: 80vh;
  margin-right: -50%;
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
  margin-right: 15px;
  background: none;
  border: none;
`;

const StyledModalBody = styled.div`
  max-height: calc(80vh - 55px);
  padding: 24px;
  background-color: #fff;
`;

const StyledModalFooter = styled.div`
  width: 100%;
  max-height: calc(80vh - 55px);
  background-color: #fff;
`;

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <StyledModal {...props} style={customStyles}>
      <StyledModalHeader>
        <StyledModalTitle>{props.title}</StyledModalTitle>
        <StyledCloseButton onClick={props.onRequestClose}>
          <CloseOutlined />
        </StyledCloseButton>
      </StyledModalHeader>
      <StyledModalBody>{props.body}</StyledModalBody>
      <StyledModalFooter>{props.footer}</StyledModalFooter>
    </StyledModal>
  );
};

export default Modal;
export { Modal };
