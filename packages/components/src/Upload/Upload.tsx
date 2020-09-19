import { Upload as UploadComponent } from 'antd';
import React from 'react';
import { UploadProps } from './interface';

const { Dragger } = UploadComponent;

const Upload: React.FC<UploadProps> = ({ children, ...props }) => {
  return <Dragger {...props}>{children}</Dragger>;
};

export default Upload;
export { Upload };
