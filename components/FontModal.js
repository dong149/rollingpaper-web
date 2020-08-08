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
  menuButton: {
    fontSize: "1.2em",
    color: "#FFFFFF"
  },
  stylePropButton: {
    fontSize: "1.2em",
    color: "#FFFFFF",
    borderStyle: "solid",
    borderColor: "#FFFFFF",
    padding: "10px",
    borderRadius: "5%",
    borderWidth: "1px"
  }
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
      contentLabel="Example Modal">
      <Layouts className={classes.root}>
        <div>
          <span style={{float: "left"}} onClick={() => setFontModalIsOpen(false)}>
            <img style={{width: "30px"}} src="/icons/back-icon.png" ></img>
          </span>

          <span style={{float: "right"}} onClick={() => setFontModalIsOpen(false)}>
            <a className={classes.menuButton}>완료</a>
          </span>

          <p style={{textAlign: "center", margin: 0}}>
            <span style={{margin: "0 10px 0 0"}} onClick={() => setEditMode('text')}>
              <a className={classes.menuButton}>텍스트</a>
            </span>
            <span style={{margin: "0 10px 0 10px"}} onClick={() => setEditMode('sort')}>
              <a className={classes.menuButton}>정렬</a>
            </span>
            <span style={{margin: "0 0 0 10px"}} onClick={() => setEditMode('color')}>
              <a className={classes.menuButton}>색</a>
            </span>
          </p>
        </div>

        <textarea
          className={classes.textInput}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          style={{
            fontFamily: `${font}`,
            fontSize: '25px',
            backgroundColor: 'transparent',
            border: 'none',
            color: `${color}`,
            textAlign: `${sort}`,
            height: "600px"
          }}
        />

        <div style={{ marginTop: "30px" }}>
          {editMode === 'text' && (
            <>
              <span style={{margin: "0 10px 0 0"}} onClick={() => setFont('NanumSquareRound')}>
                <a className={classes.stylePropButton}>나눔스퀘어라운드</a>
              </span>
              <span style={{margin: "0 10px 0 10px"}} onClick={() => setFont('NanumBrush')}>
                <a className={classes.stylePropButton}>나눔브러쉬</a>
              </span>
              <span style={{margin: "0 0 0 10px"}} onClick={() => setFontModalIsOpen(false)}>
                <a className={classes.stylePropButton}>손글씨체</a>
              </span>
            </>
          )}
          {editMode === 'sort' && (
            <>
              <span style={{margin: "0 10px 0 0"}} onClick={() => setSort('left')}>
                <a className={classes.stylePropButton}>왼쪽</a>
              </span>
              <span style={{margin: "0 10px 0 10px"}} onClick={() => setSort('center')}>
                <a className={classes.stylePropButton}>중간</a>
              </span>
              <span style={{margin: "0 0 0 10px"}} onClick={() => setSort('right')}>
                <a className={classes.stylePropButton}>오른쪽</a>
              </span>
            </>
          )}
          {editMode === 'color' && (
            <>
              <span style={{margin: "0 10px 0 0"}} onClick={() => setColor('red')}>
                <a className={classes.stylePropButton}>빨간색</a>
              </span>
              <span style={{margin: "0 10px 0 10px"}} onClick={() => setColor('black')}>
                <a className={classes.stylePropButton}>검은색</a>
              </span>
              <span style={{margin: "0 0 0 10px"}} onClick={() => setColor('yellow')}>
                <a className={classes.stylePropButton}>노란색</a>
              </span>
            </>
          )}
        </div>
      </Layouts>
    </Modal>
  );
};

export default FontModal;
