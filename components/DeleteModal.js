import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layouts from './Layouts';
import Modal from 'react-modal';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    flexDirection: 'column',
    background: '#FFF',
  },
  menuButton: {
    fontSize: '1.2em',
    color: '#FFFFFF',
  },
  stylePropButton: {
    fontSize: '1.2em',
    color: '#FFFFFF',
    borderStyle: 'solid',
    borderColor: '#FFFFFF',
    padding: '10px',
    borderRadius: '5%',
    borderWidth: '1px',
  },
});
const customModalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '300px',
    borderRadius: '10px',
    padding: '0',
    // height: '100px',
    transform: 'translate(-50%, -50%)',
    transition: '1.1s ease-out',
    boxShadow: '-2rem 2rem 2rem rgba(black, 0.2)',
  },
};

const DeleteModal = (props) => {
  const classes = useStyles();
  const { deleteModalIsOpen, setDeleteModalIsOpen } = props;
  return (
    <Modal
      isOpen={deleteModalIsOpen}
      style={customModalStyles}
      onRequestClose={() => setDeleteModalIsOpen(false)}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div
        style={{
          width: '100%',
        }}
      >
        <div
          style={{
            width: '100%',
            fontSize: '18px',
            height: '100px',
            lineHeight: '100px',
            borderBottom: '1px solid #000',
            textAlign: 'center',
          }}
        >
          <span>삭제 하시겠습니까?</span>
        </div>
        <div
          style={{
            display: 'inline-block',
            fontSize: '18px',
            height: '40px',
            lineHeight: '40px',
            width: '50%',
            textAlign: 'center',
          }}
        >
          <span>삭제할래요</span>
        </div>
        <div
          style={{
            display: 'inline-block',
            fontSize: '18px',
            width: '50%',
            height: '40px',
            lineHeight: '40px',
            borderLeft: '1px solid #000',
            textAlign: 'center',
          }}
        >
          <span>취소할래요</span>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
