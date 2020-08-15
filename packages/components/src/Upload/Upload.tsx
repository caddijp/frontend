import { InboxOutlined } from '@ant-design/icons';
import { Upload as UploadComponent } from 'antd';
import React from 'react';
import { UploadProps } from './interface';

const { Dragger } = UploadComponent;

const Upload: React.FC<UploadProps> = (props) => {
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">インポートするファイルをここにドラッグ&amp;ドロップ</p>
      <p className="ant-upload-hint">※対応データ形式：.PDF</p>
    </Dragger>
  );
};

export default Upload;
export { Upload };
