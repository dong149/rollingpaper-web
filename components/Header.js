import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: '0 9px',
  },
});

const Header = (props) => {
  const classes = useStyles(props);
  return <header className={classes.header}>{props.children}</header>;
};

export default Header;
