// 서비스 전체 레이아웃 컴포넌트
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    background: (props) => props.bgColor,
  },
  paper: {
    position: 'relative',
    paddingTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
}));

const Layouts = (props) => {
  const classes = useStyles(props);
  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>{props.children}</div>
    </Container>
  );
};

export default Layouts;
