import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import styled from 'styled-components';

export interface ModalProps extends ReactModalProps {
  title: string;
}

const customStyles = {
  overlay: {
    background: 'rgba(72, 82, 109, 0.2)',
  },
};

const StyledModal = styled(ReactModal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 568px;
  max-height: 80vh;
  box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.05), 0px 3px 6px rgba(0, 0, 0, 0.12),
    0px 6px 16px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  background: #fff;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 55px;
  background: #fff;
  box-shadow: inset 0px -1px 0px #f0f0f0;
`;

const StyledModalTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  margin-left: 24px;
  color: rgba(0, 0, 0, 0.85);
`;

const StyledCloseButton = styled.button`
  margin-right: 15px;
  border: none;
  background: none;
`;

const StyledModalBody = styled.div`
  max-height: calc(80vh - 55px);
  width: 100%;
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
      <StyledModalBody>{props.children}</StyledModalBody>
    </StyledModal>
  );
};

export default Modal;
export { Modal };
