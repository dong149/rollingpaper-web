import React from 'react';
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
});
const customModalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#666666',
  },
  content: {
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    // marginRight: '-50%',
    width: '100%',
    height: '100%',
    background: '#666666',
    // transform: 'translate(-50%, -50%)',
  },
};

const ColorModal = (props) => {
  const classes = useStyles(props);
  const { colorModalIsOpen, setColorModalIsOpen } = props;
  return (
    <Modal
      isOpen={colorModalIsOpen}
      style={customModalStyles}
      contentLabel="Example Modal"
    >
      <Layouts className={classes.root}>
        <span>colormodal 입니다.</span>
        <button onClick={() => setColorModalIsOpen(false)}>
          <a>뒤로</a>
        </button>
        <button onClick={() => setColorModalIsOpen(false)}>
          <a>완료</a>
        </button>
      </Layouts>
    </Modal>
  );
};

export default ColorModal;
