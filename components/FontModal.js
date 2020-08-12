import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layouts from './Layouts';
import Modal from 'react-modal';
import ContentEditable from 'react-contenteditable';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    flexDirection: 'column',
    background: '#FFF',
  },
  menuButton: {
    width: '48px',
  },
  stylePropButton: {
    fontSize: '1.2em',
    color: '#FFFFFF',
    borderStyle: 'solid',
    borderColor: '#FFFFFF',
    padding: '10px',
    borderRadius: '5%',
    borderWidth: '1px',
  },
  textarea: {
    display: 'flex',
    margin: '0 auto',
    width: '312px',
    height: '340px',
    marginTop: '30px',
    // padding: '16px',
    borderRadius: '13px',
    // backgroundColor: '#f2f2f2',
    textAlign: 'center',
    wordBreak: 'break-all',
    '& div': {
      flex: '1',
      overflow: 'scroll',
      // scrollbarWidth: 'none',
      // overflowStyle: 'none',
      wordBreak: 'break-all',
      fontSize: '20px',
      fontFamily: 'NanumBrush',
      lineHeight: '1.5em',
      '&:focus': {
        outline: 'none',
      },
    },
  },
  fontPropButton: {
    fontSize: '16px',
    lineHeight: '32px',
    color: '#FFFFFF',
    border: '1px solid #fff',
    padding: '4px 10px 4px 10px',
    borderRadius: '6px',
  },
  confirmButton: {
    fontSize: '18px',
    lineHeight: '26px',
    fontWeight: 'bold',
    color: 'white',
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
    padding: '0',
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
    backgroundColor,
    setBackgroundColor,
  } = props;
  const [editMode, setEditMode] = useState('text');
  return (
    <Modal
      isOpen={fontModalIsOpen}
      style={customModalStyles}
      contentLabel="Example Modal"
    >
      <Layouts className={classes.root}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 9px',
            height: '57px',
          }}
        >
          <span
            style={{ float: 'left' }}
            onClick={() => setFontModalIsOpen(false)}
          >
            <img
              style={{ width: '16px' }}
              src="/icons/back-light-icon.png"
            ></img>
          </span>

          <span
            style={{ float: 'right' }}
            onClick={() => setFontModalIsOpen(false)}
          >
            <a className={classes.confirmButton}>완료</a>
          </span>
        </div>
        <div
          className={classes.textarea}
          onClick={() => setFontModalIsOpen(true)}
          style={{
            fontFamily: `${font}`,
            backgroundColor: `${backgroundColor}`,
            backgroundImage: `url('/icons/f6f6f6.png')`,
            backgroundPosition: 'center center',
            backgroundBlendMode: 'multiply',
            backgroundRepeat: 'no-repeat',
            // backgroundAttachment: 'fixed',
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
              display: 'flex',
              alignItems: 'center',
              fontFamily: `${font}`,
              color: `${color}`,
              textAlign: `${sort}`,
              padding: '14px',
              fontSize: '24px',
              lineHeight: '38px',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: '30px',
            width: '100%',
          }}
        >
          {editMode === 'text' && (
            <>
              <span
                style={{ margin: '0 10px 0 0' }}
                onClick={() => setFont('NanumSquareRound')}
              >
                <a className={classes.fontPropButton}>나눔스퀘어라운드</a>
              </span>
              <span
                style={{ margin: '0 10px 0 10px' }}
                onClick={() => setFont('NanumBrush')}
              >
                <a className={classes.fontPropButton}>나눔브러쉬</a>
              </span>
              <span
                style={{ margin: '0 0 0 10px' }}
                onClick={() => setFontModalIsOpen(false)}
              >
                <a className={classes.fontPropButton}>손글씨체</a>
              </span>
            </>
          )}
          {editMode === 'sort' && (
            <>
              <span
                style={{ margin: '0 10px 0 0' }}
                onClick={() => setSort('left')}
              >
                <a className={classes.stylePropButton}>왼쪽</a>
              </span>
              <span
                style={{ margin: '0 10px 0 10px' }}
                onClick={() => setSort('center')}
              >
                <a className={classes.stylePropButton}>중간</a>
              </span>
              <span
                style={{ margin: '0 0 0 10px' }}
                onClick={() => setSort('right')}
              >
                <a className={classes.stylePropButton}>오른쪽</a>
              </span>
            </>
          )}
          {editMode === 'color' && (
            <>
              <span
                style={{ margin: '0 10px 0 0' }}
                onClick={() => setColor('red')}
              >
                <a className={classes.stylePropButton}>빨간색</a>
              </span>
              <span
                style={{ margin: '0 10px 0 10px' }}
                onClick={() => setColor('black')}
              >
                <a className={classes.stylePropButton}>검은색</a>
              </span>
              <span
                style={{ margin: '0 0 0 10px' }}
                onClick={() => setColor('yellow')}
              >
                <a className={classes.stylePropButton}>노란색</a>
              </span>
            </>
          )}
        </div>
        <p style={{ textAlign: 'center' }}>
          <span
            style={{ margin: '0 10px 0 0' }}
            onClick={() => setEditMode('text')}
          >
            <img
              src="/icons/edit-text-focus.png"
              className={classes.menuButton}
            />
          </span>
          <span
            style={{ margin: '0 10px 0 10px' }}
            onClick={() => setEditMode('sort')}
          >
            <img src="/icons/edit-sort.png" className={classes.menuButton} />
          </span>
          <span
            style={{ margin: '0 0 0 10px' }}
            onClick={() => setEditMode('color')}
          >
            <img src="/icons/edit-color.png" className={classes.menuButton} />
          </span>
        </p>
      </Layouts>
    </Modal>
  );
};

export default FontModal;
