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
      >
        <Paper
          elevation={0}
          className={classes.paper}
          style={{ backgroundColor: color }}
          onClick={() => {
            setBackgroundColor(color);
            setColorModalIsOpen(false);
          }}
        ></Paper>
      </Grid>
    );
  }

  return (
    <Modal
      isOpen={colorModalIsOpen}
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
          <span onClick={() => setColorModalIsOpen(false)}>
            <img
              style={{ width: '16px' }}
              src="/icons/back-light-icon.png"
            ></img>
          </span>
          {/* <span>
            <a className={classes.confirmButton}>완료</a>
          </span> */}
        </div>
        <Grid className={classes.colorList} container spacing={3}>
          {colorCards}
        </Grid>
      </Layouts>
    </Modal>
  );
};

export default ColorModal;
