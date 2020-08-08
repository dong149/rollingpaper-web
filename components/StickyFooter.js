import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: (props) => props.position ?? 'fixed',
    width: 'calc(100vw - 32px)',
    bottom: '16px',
    textAlign: (props) => props.align ?? 'left',
    boxSizing: 'border-box',
  },
});
const StickyFooter = (props) => {
  const classes = useStyles(props);
  console.log(props.align);
  return <div className={classes.root}>{props.children}</div>;
};

export default StickyFooter;
