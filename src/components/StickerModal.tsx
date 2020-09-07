import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';

import Layouts from './Layouts';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    flexDirection: 'column',
    background: '#FFF',
    flexGrow: 1,
    zIndex: 100,
  },
  paper: {
    width: '141px',
    height: '141px',
  },
  colorList: {
    marginTop: '20px',
  },
  confirmButton: {
    fontSize: '18px',
    lineHeight: '26px',
    fontWeight: 'bold',
    color: 'white',
  },
  imageButton: {
    width: '110px',
    height: '110px',
    cursor: 'pointer',
    '& img': {
      width: '100%',
    },
  },
}));

const customModalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#666666',
    zIndex: 100,
  },
  content: {
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    width: '100%',
    height: '100%',
    background: '#666666',
    padding: '0',
  },
};

interface Props {
  setStickerModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStickerURL: React.Dispatch<React.SetStateAction<string | null>>;
  stickerModalIsOpen: boolean;
  stickerURL: string | null;
}

const StickerModal = ({
  stickerModalIsOpen,
  setStickerModalIsOpen,
  setStickerURL,
}: Props) => {
  const classes = useStyles();
  const stickerCards = [];
  for (let i = 1; i <= 60; i++) {
    const key = uuidv4();
    const stickerURL = `/images/main_sticker_${i < 10 ? `0${i}` : i}.png`;
    stickerCards.push(
      <Grid
        item
        xs={ 4 }
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key={ key }
      >
        <button
          className={ classes.imageButton }
          onClick={ () => {
            setStickerURL(stickerURL);
            setStickerModalIsOpen(false);
          } }
        >
          <img src={ stickerURL } />
        </button>
      </Grid>,
    );
  }
  const spring = {
    type: 'spring',
    damping: 20,
    stiffness: 100,
    when: 'afterChildren',
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <Modal
        isOpen={ stickerModalIsOpen }
        style={ customModalStyles as Modal.Styles }
        contentLabel='Color Modal'
      >
        <motion.div
          transition={ spring }
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
        >
          <Layouts className={ classes.root }>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '0 9px',
              }}
            >
              <span onClick={ () => setStickerModalIsOpen(false) }>
                <img
                  style={{ width: '16px' }}
                  src='/icons/back-light-icon.png'
                ></img>
              </span>
            </div>
            <Grid className={ classes.colorList } container spacing={ 3 }>
              { stickerCards }
            </Grid>
          </Layouts>
        </motion.div>
      </Modal>
    </AnimatePresence>
  );
};

export default StickerModal;
