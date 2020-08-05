import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core';

import Link from 'next/link';
import Layouts from '../../components/Layouts';
import Buttons from '../../components/Buttons';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    flexDirection: 'column',
    background: '#FFF',
  },
  header: {
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: '41px',
    '& span': {
      fontSize: '18px',
    },
  },
  textarea: {
    display: 'table',
    margin: '0 auto',
    width: '335px',
    height: '462px',
    marginTop: '30px',
    borderRadius: '13px',
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    '& div': {
      maxWidth: '100%',
      display: 'table-cell',
      verticalAlign: 'middle',
      fontSize: '20px',
      '&:focus': {
        outline: 'none',
      },
    },
  },
  from: {
    width: '100%',
    marginTop: '28px',
    paddingRight: '20px',
    textAlign: 'right',
    fontSize: '24px',
    fontWeight: 'lighter',
    '& div': {
      display: 'inline',
      '& input': {
        width: '81px',
        fontSize: '22px',
        outline: 'none',
        border: '0',
        borderBottom: '1px solid grey',
      },
    },
  },
  footer: {
    width: '375px',
    textAlign: 'right',
    marginTop: '30px',
    marginRight: '20px',
  },
}));
const Editor = (props) => {
  const classes = useStyles();
  const { name, num } = props;
  return (
    <Layouts className={classes.root}>
      <header className={classes.header}>
        <Link
          href={`/sender/[main]`}
          as={`/sender/main?name=${name}&num=${num}`}
        >
          <button>
            <a>취소</a>
          </button>
        </Link>
      </header>

      <div className={classes.textarea}>
        <div contentEditable="true"></div>
      </div>
      <div className={classes.from}>
        <span>From.</span>
        <div>
          <input type="text" placeholder="보내는이" />
        </div>
      </div>
      <footer className={classes.footer}>
        <Buttons content="저장" />
      </footer>
    </Layouts>
  );
};
Editor.getInitialProps = async (context) => {
  console.log(context);
  const name = context.query.name;
  const num = context.query.num;
  console.log(name, num);
  return {
    name: name,
    num: num,
  };
};

export default Editor;
