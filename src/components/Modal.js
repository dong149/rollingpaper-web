import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as ReactModal from 'react-modal';

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
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontSize: '16px',
    lineHeight: '20px',
    height: '110px',
    borderBottom: '1px solid #f6f6f6',
    textAlign: 'center',
  },
  modalButtons: {
    display: 'flex',
  },
  modalButton: {
    flex: '0 0 50%',
    height: '56px',
    fontSize: '18px',
    fontWeight: (props) => (props.focus ? 'bold' : 'normal'),
    color: (props) => (props.focus ? '#000' : '#666'),
    textAlign: 'center',
    border: '1px solid #f6f6f6',
  },
  modalFullButton: {
    flex: '0 0 100%',
    height: '56px',
    fontSize: '18px',
    fontWeight: (props) => (props.focus ? 'bold' : 'normal'),
    color: (props) => (props.focus ? '#000' : '#666'),
    textAlign: 'center',
    border: '1px solid #f6f6f6',
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
    transform: 'translate(-50%, -50%)',
    transition: '1.1s ease-out',
    boxShadow: '-2rem 2rem 2rem rgba(black, 0.2)',
  },
};

const Modal = (props) => {
  const { modalIsOpen, setModalIsOpen, children } = props;
  return (
    <ReactModal
      isOpen={modalIsOpen}
      style={customModalStyles}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  );
};

export const ModalTitie = (props) => {
  const { children } = props;
  const classes = useStyles(props);
  return <div className={classes.modalContent}>{children}</div>;
};

export const ModalButton = (props) => {
  const { children, onClick, focus } = props;
  const classes = useStyles(props);
  return (
    <button onClick={onClick} className={classes.modalButton}>
      {children}
    </button>
  );
};
export const ModalFullButton = (props) => {
  const { children, onClick, focus } = props;
  const classes = useStyles(props);
  return (
    <button onClick={onClick} className={classes.modalFullButton}>
      {children}
    </button>
  );
};

export const ModalButtonWrapper = (props) => {
  const { children } = props;
  const classes = useStyles(props);
  return <div className={classes.modalButtons}>{children}</div>;
};

export default Modal;
