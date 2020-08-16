import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layouts from './Layouts';
import Modal from 'react-modal';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
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
    width: '83px',
    height: '83px',
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

const StickerModal = (props) => {
  const classes = useStyles(props);
  const availableColors = [
    '#FFFFFF',
    '#F4F4F4',
    '#DBE6EF',
    '#F2E5E5',
    '#FDFFB5',
    '#E6E4D9',
    '#B4D4F1',
    '#F1C0B5',
    '#AE9BF8',
    '#F3C982',
  ];
  const {
    stickerModalIsOpen,
    setStickerModalIsOpen,
    stickerURL,
    setStickerURL,
  } = props;
  const stickerCards = [];
  for (let i = 1; i <= 28; i++) {
    const stickerURL = `/images/main_sticker_${i < 10 ? `0${i}` : i}.png`;
    stickerCards.push(
      <Grid
        item
        xs={4}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          className={classes.imageButton}
          onClick={() => {
            setStickerURL(stickerURL);
            setStickerModalIsOpen(false);
          }}
        >
          <img src={stickerURL} />
        </button>
      </Grid>
    );
  }

  return (
    <Modal
      isOpen={stickerModalIsOpen}
      style={customModalStyles}
      contentLabel="Color Modal"
    >
      <Layouts className={classes.root}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 9px',
          }}
        >
          <span onClick={() => setStickerModalIsOpen(false)}>
            <img
              style={{ width: '16px' }}
              src="/icons/back-light-icon.png"
            ></img>
          </span>
        </div>
        <Grid className={classes.colorList} container spacing={3}>
          {stickerCards}
        </Grid>
      </Layouts>
    </Modal>
  );
};

export default StickerModal;
