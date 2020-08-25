import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, NoSsr } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  btn: {
    minWidth: '125px',
    height: '56px',
    marginTop: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    background: '#222',
    borderRadius: '10px',
    boxShadow: 'none',
    '&:hover': {
      border: 'none',
      background: '#C4C4C4',
      boxShadow: 'none',
    },
  },
  btnDark: {
    color: '#fff',
    background: '#342F2F',
  },
  btnLight: {
    color: '#000',
    border: '1px solid #A3A3A3',
    background: '#fff',
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
