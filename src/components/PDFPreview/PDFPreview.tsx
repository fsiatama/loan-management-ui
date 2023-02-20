import { Button, Modal } from 'antd';
import * as React from 'react';

interface PDFPreviewProps {
  src: string;
  showPDF: boolean;
  onClose: () => void;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ src, showPDF, onClose }) => {
  return (
    <Modal
      centered
      open={showPDF}
      closable={false}
      width={1000}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Return
        </Button>,
      ]}
    >
      <embed
        type="application/pdf"
        src={`${src}#navpanes=0&scrollbar=0`}
        width="100%"
        height="800px"
      />
    </Modal>
  );
};

export default PDFPreview;
