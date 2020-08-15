import React, { useState } from 'react';
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
  },
  paper: {
    width: '141px',
    height: '141px',
    backgroundImage: `url('/icons/f6f6f6.png')`,
    backgroundPosition: 'center center',
    backgroundBlendMode: 'multiply',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  photoArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    width: '312px',
    height: '340px',
    marginTop: '30px',
    borderRadius: '13px',
    textAlign: 'center',
    wordBreak: 'break-all',

    '& div': {
      flex: '1',
      overflow: 'scroll',
      wordBreak: 'break-all',
      fontSize: '20px',
      fontFamily: 'NanumBrush',
      lineHeight: '1.5em',
      '&:focus': {
        outline: 'none',
      },
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

const ColorModal = (props) => {
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
    colorModalIsOpen,
    setColorModalIsOpen,
    backgroundColor,
    setBackgroundColor,
  } = props;
  const colorCards = [];
  const [editPaperIsOpen, setEditPaperIsOpen] = useState(true);
  const [editPhotoIsOpen, setEditPhotoIsOpen] = useState(false);

  for (const color of availableColors) {
    colorCards.push(
      <Grid
        item
        xs={6}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key={color}
      >
        <Paper
          elevation={0}
          className={classes.paper}
          style={{ backgroundColor: color }}
          onClick={() => {
            setBackgroundColor(color);
            setColorModalIsOpen(false);
          }}
        >
          {color === backgroundColor && (
            <img src="/icons/edit-active-icon.png" style={{ width: '60px' }} />
          )}
        </Paper>
      </Grid>
    );
  }

  return (
    <Modal
      isOpen={colorModalIsOpen}
      style={customModalStyles}
      contentLabel="Color Modal"
      ariaHideApp={false}
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
          <span onClick={() => setColorModalIsOpen(false)}>
            <img
              style={{ width: '16px' }}
              src="/icons/back-light-icon.png"
            ></img>
          </span>
          <div>
            <span
              onClick={() => {
                setEditPaperIsOpen(true);
                setEditPhotoIsOpen(false);
              }}
            >
              {editPaperIsOpen ? (
                <img
                  style={{ width: '48px' }}
                  src="/icons/edit-paper-focus.png"
                ></img>
              ) : (
                <img
                  style={{ width: '48px' }}
                  src="/icons/edit-paper.png"
                ></img>
              )}
            </span>
            <span
              onClick={() => {
                setEditPhotoIsOpen(true);
                setEditPaperIsOpen(false);
              }}
            >
              {editPhotoIsOpen ? (
                <img
                  style={{ width: '48px' }}
                  src="/icons/edit-photo-focus.png"
                ></img>
              ) : (
                <img
                  style={{ width: '48px' }}
                  src="/icons/edit-photo.png"
                ></img>
              )}
            </span>
          </div>
          <span>
            <a className={classes.confirmButton}></a>
          </span>
        </div>
        {editPaperIsOpen && (
          <Grid className={classes.colorList} container spacing={3}>
            {colorCards}
          </Grid>
        )}
        {editPhotoIsOpen && (
          <div
            className={classes.photoArea}
            style={{
              backgroundColor: 'grey',
              backgroundPosition: 'center center',
              border: 'none',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <img
              src="/icons/edit-photo-add.png"
              style={{ width: '104px', height: '104px' }}
            />

            <p
              style={{
                fontSize: '18px',
                lineHeight: '32px',
                fontWeight: 'bold',
              }}
            >
              이곳을 클릭해
            </p>
            <p
              style={{
                fontSize: '18px',
                lineHeight: '32px',
                fontWeight: 'bold',
              }}
            >
              앨범에서 배경을 추가하세요.
            </p>
          </div>
        )}
      </Layouts>
    </Modal>
  );
};

export default ColorModal;
