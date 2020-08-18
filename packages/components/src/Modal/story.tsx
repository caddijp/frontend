import { Story } from '@storybook/react';
import React from 'react';
import { Modal, ModalProps } from '.';

export default {
  title: 'Modal',
  component: Modal,
};

const ExportModalContent = () => {
  return (
    <div style={{ padding: '30px' }}>
      <div className="content">
        <span>選択中の図面5件</span>
        <ul>
          <li>aaaa-aaaa-aaaa</li>
          <li>aaaa-aaaa-aaaa</li>
          <li>aaaa-aaaa-aaaa</li>
          <li>aaaa-aaaa-aaaa</li>
        </ul>
      </div>
      <div className="exportButtonArea">
        <input type="text" name="" id="inputText" />
        <button>test</button>
      </div>
    </div>
  );
};

const ExportTemplate: Story<ModalProps> = (args: ModalProps) => (
  <Modal {...args}>
    <ExportModalContent />
  </Modal>
);

export const ExportModal = ExportTemplate.bind({});

ExportModal.args = {
  title: 'エクスポート',
  isOpen: true,
};
