import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layouts from './Layouts';
import Modal from 'react-modal';
import ContentEditable from 'react-contenteditable';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
    fontSize: '15px',
    width: 'calc(100%)',
    lineHeight: '32px',
    color: '#FFFFFF',
    border: '1px solid #fff',
    padding: '4px 10px 4px 10px',
    borderRadius: '6px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  colorPropButton: {
    width: '24px',
    height: '24px',
    borderRadius: '12px',
    border: '2px solid #ffffff',
    width: 'max-content'
  },
  confirmButton: {
    fontSize: '18px',
    lineHeight: '26px',
    fontWeight: 'bold',
    color: 'white',
  },
  slider: {
    width: '100%',
    textAlign: 'center',
    padding: 0,
    // marginTop: '30px',
    // marginLeft: '-16px',
    // alignSelf: 'normal',
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
  const settings = {
    className: 'slider variable-width',
    centerMode: true,
    infinite: true,
    // slidesToShow: 2,
    speed: 500,
    arrows: false,
    initialSlide: 1,
    variableWidth: true,
    // beforeChange: (current, next) => {
    //   setSliderIndex(next + 1);
    // },
  };
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
              overflow: 'hidden',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: '30px',
            width: '100%',
            overflowX: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none !important',
            },
            scrollbarWidth: 'none',
            overflowStyle: 'none',
          }}
        >
          {editMode === 'text' && (
            <>
              <Slider {...settings} className={classes.slider}>
                <div style={{}} onClick={() => setFont('NanumSquareRound')}>
                  <span className={classes.fontPropButton}>나눔스퀘어</span>
                </div>
                <div style={{}} onClick={() => setFont('NanumSquareRound')}>
                  <span className={classes.fontPropButton}>나눔스퀘어</span>
                </div>
                <div style={{}} onClick={() => setFont('NanumBrush')}>
                  <span className={classes.fontPropButton}>나눔브러쉬</span>
                </div>
                <div style={{}} onClick={() => setFontModalIsOpen(false)}>
                  <span className={classes.fontPropButton}>손글씨체</span>
                </div>
              </Slider>
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
            <div style={{ width: '100%', textAlign: 'center' }}>
              <div
                style={{
                  margin: '0 10px 0 0',
                  backgroundColor: 'black',
                  display: 'inline-block',
                }}
                onClick={() => setColor('red')}
                className={classes.colorPropButton}
              ></div>
              <div
                style={{
                  margin: '0 10px 0 0',
                  backgroundColor: 'orange',
                  display: 'inline-block',
                }}
                onClick={() => setColor('orange')}
                className={classes.colorPropButton}
              ></div>
              <div
                style={{
                  margin: '0 10px 0 0',
                  backgroundColor: 'pink',
                  display: 'inline-block',
                }}
                onClick={() => setColor('pink')}
                className={classes.colorPropButton}
              ></div>
              <div
                style={{
                  margin: '0 10px 0 0',
                  backgroundColor: 'red',
                  display: 'inline-block',
                }}
                onClick={() => setColor('red')}
                className={classes.colorPropButton}
              ></div>
              <div
                style={{
                  margin: '0 10px 0 0',
                  backgroundColor: 'yellow',
                  display: 'inline-block',
                }}
                onClick={() => setColor('yellow')}
                className={classes.colorPropButton}
              ></div>
              <div
                style={{
                  margin: '0 10px 0 0',
                  backgroundColor: 'blue',
                  display: 'inline-block',
                }}
                onClick={() => setColor('blue')}
                className={classes.colorPropButton}
              ></div>
            </div>
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
