import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layouts from './Layouts';
import Modal from 'react-modal';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    flexDirection: 'column',
    background: '#FFF',
  },
});
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

const FontModal = (props) => {
  const classes = useStyles(props);
  const {
    fontModalIsOpen,
    setFontModalIsOpen,
    content,
    setContent,
    font,
    setFont,
    sort,
    setSort,
    color,
    setColor,
  } = props;
  //   const [text, setText] = useState('');
  //   const [font, setFont] = useState('NanumBrush');
  //   const [sort, setSort] = useState('center');
  //   const [color, setColor] = useState('black');

  const [editMode, setEditMode] = useState('text');
  return (
    <Modal
      isOpen={fontModalIsOpen}
      style={customModalStyles}
      contentLabel="Example Modal"
    >
      <Layouts className={classes.root}>
        <span>font모달입니다.</span>
        <button onClick={() => setFontModalIsOpen(false)}>
          <a>뒤로</a>
        </button>
        <button onClick={() => setFontModalIsOpen(false)}>
          <a>완료</a>
        </button>
        <button onClick={() => setEditMode('text')}>
          <a>텍스트</a>
        </button>
        <button onClick={() => setEditMode('sort')}>
          <a>정렬</a>
        </button>
        <button onClick={() => setEditMode('color')}>
          <a>색</a>
        </button>
        <textarea
          className={classes.textInput}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          style={{
            fontFamily: `${font}`,
            fontSize: '25px',
            // backgroundColor: 'transparent',
            border: 'none',
            color: `${color}`,
            textAlign: `${sort}`,
          }}
        />
        {editMode === 'text' && (
          <>
            <button onClick={() => setFont('NanumSquareRound')}>
              <a>나눔스퀘어라운드</a>
            </button>
            <button onClick={() => setFont('NanumBrush')}>
              <a>나눔브러쉬</a>
            </button>
            <button onClick={() => setFontModalIsOpen(false)}>
              <a>손글씨체</a>
            </button>
          </>
        )}
        {editMode === 'sort' && (
          <>
            <button onClick={() => setSort('left')}>
              <a>왼쪽</a>
            </button>
            <button onClick={() => setSort('center')}>
              <a>중간</a>
            </button>
            <button onClick={() => setSort('right')}>
              <a>오른쪽</a>
            </button>
          </>
        )}
        {editMode === 'color' && (
          <>
            <button onClick={() => setColor('red')}>
              <a>빨간색</a>
            </button>
            <button onClick={() => setColor('black')}>
              <a>검은색</a>
            </button>
            <button onClick={() => setColor('yellow')}>
              <a>노란색</a>
            </button>
          </>
        )}
      </Layouts>
    </Modal>
  );
};

export default FontModal;
