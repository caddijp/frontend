import { Story } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { Modal, ModalProps } from '.';
import { Button } from '../Button';

export default {
  title: 'Modal',
  component: Modal,
};

const ExportModalContent = styled.div`
  color: rgba(0, 0, 0, 0.65);
`;

const ExportFilePageIdList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ExportModalFooter = styled.div`
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 568px;
  height: 53px;
  border-radius: 2px;
  box-shadow: inset 0 1px 0 #f0f0f0;
`;

const ExportModalInputArea = styled.div`
  display: flex;
  width: 386px;
  height: 32px;
`;

const ExportModalInput = styled.input`
  width: 100%;
  font-size: 14px;
  color: #bfbfbf;
`;
const ExportModalInputFileExtentionArea = styled.span`
  width: 49px;
  text-align: center;
  background: #fafafa;
  border: 1px solid #d9d9d9;
`;
const ExportModalButton = styled(Button)`
  width: 144px;
  height: 32px;
`;

const ExportModalBodyChildren = () => {
  return (
    <ExportModalContent>
      <ExportFilePageIdList>
        <li style={{ fontWeight: 'bold' }}>選択中の図面5件</li>
        <li>aaaa-aaaa-aaaa</li>
        <li>aaaa-aaaa-aaaa</li>
        <li>aaaa-aaaa-aaaa</li>
        <li>aaaa-aaaa-aaaa</li>
        <li>aaaa-aaaa-aaaa</li>
      </ExportFilePageIdList>
    </ExportModalContent>
  );
};

const ExportModalFooterChildern = () => {
  return (
    <ExportModalFooter>
      <ExportModalInputArea>
        <ExportModalInput placeholder="ファイル名を入力※必須"></ExportModalInput>
        <ExportModalInputFileExtentionArea>.pdf</ExportModalInputFileExtentionArea>
      </ExportModalInputArea>
      <ExportModalButton type="primary">エクスポートする</ExportModalButton>
    </ExportModalFooter>
  );
};

const ExportTemplate: Story<ModalProps> = (args: ModalProps) => <Modal {...args}></Modal>;

export const ExportModal = ExportTemplate.bind({});

ExportModal.args = {
  title: 'エクスポート',
  body: ExportModalBodyChildren(),
  footer: ExportModalFooterChildern(),
  isOpen: true,
};
