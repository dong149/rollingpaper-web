import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, NoSsr } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  btn: {
    minWidth: '125px',
    height: '61px',
    marginTop: '7px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fff',
    background: '#222',
    borderRadius: '10px',
    boxShadow: 'none',
  },
  btnDark: {
    color: '#fff',
    background: '#342F2F',
    '&:focus': {
      border: 'none',
      backgroundColor: '#342F2F',
      boxShadow: 'none',
    },
    '&:active': {
      background: '#A3A3A3',
    },
  },
  btnLight: {
    color: '#000',
    border: '1px solid #A3A3A3',
    background: '#fff',
    '&:focus': {
      border: '1px solid #A3A3A3',
      backgroundColor: '#fff',
      boxShadow: 'none',
    },
    '&:active': {
      border: '1px solid #A3A3A3',
      background: '#342f2f',
    },
  },
}));

const Buttons = forwardRef(function Buttons(props, ref) {
  const classes = useStyles();
  const { content, light, full, onClick, children } = props;
  return (
    <NoSsr>
      <Button
        variant="contained"
        fullWidth={full ? true : false}
        className={
          classes.btn + ' ' + (light ? classes.btnLight : classes.btnDark)
        }
        onClick={onClick}
      >
        {children}
      </Button>
    </NoSsr>
  );
});

export default Buttons;
