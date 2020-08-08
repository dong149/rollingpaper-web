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
import ContentEditable from 'react-contenteditable';

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
    width: '100%',
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
    textAlign: 'left',
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
  menuButton: {
    fontSize: "1.2em",
    fontWeight: "600"
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
  const [content, setContent] = useState('');
  const [font, setFont] = useState('NanumBrush');
  const [sort, setSort] = useState('center');
  const [color, setColor] = useState('black');
  const [backgroundColor, setBackgroundColor] = useState('#F4F4F4');

  const { name, num, id } = props;

  const onSubmit = async () => {
    try {
      await rollingService.postRollingContent(id).then(async (res) => {
        console.log(res);
        alert('성공적으로 저장되었습니다.');
      });
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <Layouts className={classes.root}>
      <FontModal
        fontModalIsOpen={fontModalIsOpen}
        setFontModalIsOpen={setFontModalIsOpen}
        content={content}
        setContent={setContent}
        font={font}
        setFont={setFont}
        sort={sort}
        setSort={setSort}
        color={color}
        setColor={setColor}
      />
      <ColorModal
        colorModalIsOpen={colorModalIsOpen}
        setColorModalIsOpen={setColorModalIsOpen}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />

      <div>
        <Link
          href={{
            pathname: '/sender/main',
            query: { name: name, num: num },
          }}>
            <span><a className={classes.menuButton}>취소</a></span>
        </Link>
        <span style={{float: "right"}}>
          <span onClick={() => setFontModalIsOpen(true)}>
            <img style={{ width: '30px' }} src="/icons/text-icon.png"></img>
          </span>
          <span onClick={() => setColorModalIsOpen(true)}>
            <img style={{ width: '30px' }} src="/icons/background-icon.png"></img>
          </span>
        </span>
      </div>

      <div
        className={classes.textarea}
        onClick={() => setFontModalIsOpen(true)}
        style={{
          fontFamily: `${font}`,
          backgroundColor: `${backgroundColor}`,
          border: 'none',
          color: `${color}`,
          textAlign: `${sort}`,
        }}
      >
        <ContentEditable
          contentEditable="true"
          html={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          style={{
            fontFamily: `${font}`,
            color: `${color}`,
            textAlign: `${sort}`,
          }}
        />
      </div>
      <div className={classes.from}>
        <span>From.</span>
        <div>
          <input type="text" placeholder="보내는이" />
        </div>
      </div>
      <StickyFooter align="right">
        <Buttons onClick={() => onSubmit()}>저장</Buttons>
      </StickyFooter>
    </Layouts>
  );
};
Editor.getInitialProps = async (context) => {
  console.log(context);
  const name = context.query.name;
  const num = context.query.num;
  const id = context.query.id || '';
  console.log('sender/editor.js에서의 name, num : ', name, num);
  return {
    name: name,
    num: num,
    id: id,
  };
};

export default Editor;
