import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: '0 9px',
  },
});

const Header = (props:any) => {
  const classes = useStyles(props);

  return <header className={ classes.header }>{ props.children }</header>;
};

export default Header;
