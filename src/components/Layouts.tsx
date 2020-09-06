// 서비스 전체 레이아웃 컴포넌트
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    background: (props) => props.bgColor,
  },
  paper: {
    position: 'relative',
    paddingTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

const Layouts = (props) => {
  const classes = useStyles(props);

  return (
    <Container component='main' maxWidth='xs' className={ classes.root }>
      <CssBaseline />
      <div className={ classes.paper }>{ props.children }</div>
    </Container>
  );
};

export default Layouts;
