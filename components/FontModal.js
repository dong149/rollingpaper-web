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
    // borderStyle: 'solid',
    borderColor: '#FFFFFF',
    // padding: '10px',
    borderRadius: '5%',
    borderWidth: '1px',
    width: '48px',
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
    fontSize: '23px',
    width: 'calc(100%)',
    lineHeight: '50px',
    color: '#FFFFFF',
    border: '1px solid #fff',
    padding: '4px 10px 4px 10px',
    borderRadius: '6px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  clickedFontPropButton: {
    fontSize: '23px',
    width: 'calc(100%)',
    lineHeight: '50px',
    color: '#000',
    border: '1px solid #fff',
    backgroundColor: '#fff',
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
    transition: '1s all',
  },
  clickedColorPropButton: {
    width: '36px',
    height: '36px',
    borderRadius: '18px',
    border: '2px solid #ffffff',
    transition: '1s all',
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
  },
  editButtonBar: {
    textAlign: 'center',
    position: 'absolute',
    padding: '5px',
    bottom: '0%',
    background: 'rgba(0, 0, 0, 0.3)',
    width: 'calc(100% + 32px)',
    marginLeft: '-16px',
  },
  propButton: {
    display: 'flex',
    marginTop: '30px',
    width: '100%',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none !important',
    },
    scrollbarWidth: 'none',
    overflowStyle: 'none',
  },
  fontPropButtonWrap: {
    display: 'flex',
    marginTop: '30px',
    width: '100%',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none !important',
    },
    scrollbarWidth: 'none',
    overflowStyle: 'none',
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
  const fontSettings = {
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
      ariaHideApp={false}
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
              justifyContent: `${sort}`,
              padding: '15px',
              fontSize: '24px',
              lineHeight: '38px',
              overflow: 'hidden',
            }}
          />
        </div>

        <div className={classes.fontPropButtonWrap}>
          {editMode === 'text' && (
            <>
              <Slider {...fontSettings} className={classes.slider}>
                <div onClick={() => setFont('NanumSquareRound')}>
                  <span
                    style={{ fontFamily: 'NanumSquareRound' }}
                    className={`${
                      font === 'NanumSquareRound'
                        ? classes.clickedFontPropButton
                        : classes.fontPropButton
                    }`}
                  >
                    기본서체
                  </span>
                </div>
                <div
                  style={{ fontFamily: '강부장님체' }}
                  onClick={() => setFont('강부장님체')}
                >
                  <span
                    style={{ fontFamily: '강부장님체' }}
                    className={`${
                      font === '강부장님체'
                        ? classes.clickedFontPropButton
                        : classes.fontPropButton
                    }`}
                  >
                    강부장님체
                  </span>
                </div>
                <div onClick={() => setFont('사랑해아들체')}>
                  <span
                    style={{ fontFamily: '사랑해아들체' }}
                    className={`${
                      font === '사랑해아들체'
                        ? classes.clickedFontPropButton
                        : classes.fontPropButton
                    }`}
                  >
                    사랑해아들체
                  </span>
                </div>
                <div onClick={() => setFont('NanumBrush')}>
                  <span
                    style={{ fontFamily: 'NanumBrush' }}
                    className={`${
                      font === 'NanumBrush'
                        ? classes.clickedFontPropButton
                        : classes.fontPropButton
                    }`}
                  >
                    나눔브러쉬체
                  </span>
                </div>
              </Slider>
            </>
          )}
          {editMode === 'sort' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <span
                style={{ margin: '0 10px 0 0' }}
                onClick={() => setSort('flex-start')}
              >
                <img
                  className={classes.stylePropButton}
                  src="/icons/text_left-icon.png"
                ></img>
              </span>
              <span
                style={{ margin: '0 10px 0 10px' }}
                onClick={() => setSort('center')}
              >
                <img
                  className={classes.stylePropButton}
                  src="/icons/text_center-icon.png"
                ></img>
              </span>
              <span
                style={{ margin: '0 0 0 10px' }}
                onClick={() => setSort('flex-end')}
              >
                <img
                  className={classes.stylePropButton}
                  src="/icons/text_right-icon.png"
                ></img>
              </span>
            </div>
          )}
          {editMode === 'color' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  margin: '0 10px 0 0',
                  backgroundColor: 'black',
                  display: 'inline-block',
                }}
                onClick={() => setColor('black')}
                className={`${
                  color === 'black'
                    ? classes.clickedColorPropButton
                    : classes.colorPropButton
                }`}
              ></div>
              <div
                style={{
                  margin: '0 10px 0 0',
                  backgroundColor: 'orange',
                  display: 'inline-block',
                }}
                onClick={() => setColor('orange')}
                className={`${
                  color === 'orange'
                    ? classes.clickedColorPropButton
                    : classes.colorPropButton
                }`}
              ></div>
              <div
                style={{
                  margin: '0 10px 0 0',
                  backgroundColor: 'pink',
                  display: 'inline-block',
                }}
                onClick={() => setColor('pink')}
                className={`${
                  color === 'pink'
                    ? classes.clickedColorPropButton
                    : classes.colorPropButton
                }`}
              ></div>
              <div
                style={{
                  margin: '0 10px 0 0',
                  backgroundColor: 'red',
                  display: 'inline-block',
                }}
                onClick={() => setColor('red')}
                className={`${
                  color === 'red'
                    ? classes.clickedColorPropButton
                    : classes.colorPropButton
                }`}
              ></div>
              <div
                style={{
                  margin: '0 10px 0 0',
                  backgroundColor: 'yellow',
                  display: 'inline-block',
                }}
                onClick={() => setColor('yellow')}
                className={`${
                  color === 'yellow'
                    ? classes.clickedColorPropButton
                    : classes.colorPropButton
                }`}
              ></div>
              <div
                style={{
                  margin: '0 10px 0 0',
                  backgroundColor: 'blue',
                  display: 'inline-block',
                }}
                onClick={() => setColor('blue')}
                className={`${
                  color === 'blue'
                    ? classes.clickedColorPropButton
                    : classes.colorPropButton
                }`}
              ></div>
            </div>
          )}
        </div>
        <div className={classes.editButtonBar}>
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
        </div>
      </Layouts>
    </Modal>
  );
};

export default FontModal;
