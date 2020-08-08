// 에디터 페이지입니다.
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Link from 'next/link';
import Layouts from '../../components/Layouts';
import Header from '../../components/Header';
import StickyFooter from '../../components/StickyFooter';
import Buttons from '../../components/Buttons';
import Modal from 'react-modal';
import dynamic from 'next/dynamic';
import FontModal from '../../components/FontModal';
import ColorModal from '../../components/ColorModal';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    flexDirection: 'column',
    background: '#FFF',
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
      fontSize: '30px',
      fontFamily: 'NanumBrush',
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
    // marginRight: '-50%',
    width: '100%',
    height: '100%',
    background: '#666666',
    // transform: 'translate(-50%, -50%)',
  },
};

const Editor = (props) => {
  const classes = useStyles();
  const [fontModalIsOpen, setFontModalIsOpen] = useState(false);
  const [colorModalIsOpen, setColorModalIsOpen] = useState(false);
  const { name, num } = props;

  return (
    <Layouts className={classes.root}>
      <FontModal
        fontModalIsOpen={fontModalIsOpen}
        setFontModalIsOpen={setFontModalIsOpen}
      />
      <ColorModal
        colorModalIsOpen={colorModalIsOpen}
        setColorModalIsOpen={setColorModalIsOpen}
      />
      <Header>
        <Link
          href={{
            pathname: '/sender/main',
            query: { name: name, num: num },
          }}
        >
          <button>
            <a>취소</a>
          </button>
        </Link>
        <button onClick={() => setColorModalIsOpen(true)}>
          <a>color모달</a>
        </button>
        <button onClick={() => setFontModalIsOpen(true)}>
          <a>font모달</a>
        </button>
      </Header>

      <div className={classes.textarea}>
        <div contentEditable="true"></div>
      </div>
      <div className={classes.from}>
        <span>From.</span>
        <div>
          <input type="text" placeholder="보내는이" />
        </div>
      </div>
      <StickyFooter align="right">
        <Buttons>저장</Buttons>
      </StickyFooter>
    </Layouts>
  );
};
Editor.getInitialProps = async (context) => {
  console.log(context);
  const name = context.query.name;
  const num = context.query.num;
  console.log('sender/editor.js에서의 name, num : ', name, num);
  return {
    name: name,
    num: num,
  };
};

export default Editor;
