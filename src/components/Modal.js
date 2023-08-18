import React from 'react';
import ReactModal from 'react-modal';
import './Modal.css';

// 모달 스타일을 설정합니다.
const modalStyle = {
    content: {
      width: '500px',
      height: '400px',
      margin: 'auto',
      borderRadius: '8px',
      border: 'none',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
  
  // 모달 컴포넌트를 정의합니다.
  const Modal = ({ isOpen, onClose, children }) => {
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={modalStyle}
        ariaHideApp={false} // React 16 이후 버전부터는 필요합니다.
      >
        {children}
      </ReactModal>
    );
  };
  
  export default Modal;