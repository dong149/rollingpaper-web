import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layouts from './Layouts';
import Modal from 'react-modal';
import ContentEditable from 'react-contenteditable';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { isEmpty } from '../utils';

// static variables
const FONT_FAMILY = [
  {
    family: 'NanumSquareRound',
    name: '기본서체',
  },
  {
    family: '강부장님체',
    name: '강부장님체',
  },
  {
    family: '사랑해아들체',
    name: '사랑해아들체',
  },
  {
    family: 'NanumBrush',
    name: '나눔브러쉬체',
  },
];
const FONT_COLORS = [
  '#000000',
  '#FFFFFF',
  '#F4511E',
  '#FBC02D',
  '#00C853',
  '#0091EA',
  '#00B8D4',
  '#00695C',
  '#AA00FF',
  '#7B1FA2',
];
const FONT_ALIGN = [
  {
    align: 'flex-start',
    imgURL: 'detail_text1',
  },
  {
    align: 'center',
    imgURL: 'detail_text2',
  },
  {
    align: 'flex-end',
    imgURL: 'detail_text3',
  },
];
const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    flexDirection: 'column',
    background: '#FFF',
    zIndex: 100,
  },
  menuButton: {
    width: '48px',
  },
  stylePropButton: {
    margin: '0 5px',
    fontSize: '1.2em',
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderRadius: '5%',
    borderWidth: '1px',
    width: '48px',
    '&:focus': {
      outline: 'none',
    },
    '& img': {
      width: '100%',
    },
  },
  textarea: {
    display: 'flex',
    margin: '0 auto',
    width: '90%',
    marginTop: '30px',
    borderRadius: '13px',
    textAlign: 'center',
    wordBreak: 'break-all',
    '& div': {
      flex: '1',
      overflow: 'scroll',
      wordBreak: 'break-all',
      fontSize: '20px',
      fontFamily: 'NanumBrush',
      lineHeight: '1.5em',
      '&:focus': {
        outline: 'none',
      },

      height: '340px',
    },
  },
  fontPropButton: {
    fontSize: '18px',
    color: '#FFFFFF',
    border: '1px solid #fff',
    padding: '6px 15px 6px 15px',
    borderRadius: '6px',
    margin: '0 5px 8px',
    whiteSpace: 'nowrap',
    scrollBehavior: 'smooth',
    '&:focus': {
      outline: 'none',
    },
  },
  clickedFontPropButton: {
    color: '#000',
    backgroundColor: '#fff',
  },
  colorPropButton: {
    width: '24px',
    height: '24px',
    borderRadius: '12px',
    border: '2px solid #ffffff',
    margin: '0 5px',
    backgroundColor: (props) => props.currentColor,
    display: 'inline-block',
    '&:focus': {
      outline: 'none',
    },
  },
  clickedColorPropButton: {
    width: '36px',
    height: '36px',
    borderRadius: '18px',
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
    justifyContent: 'center',
    alignItems: 'center',
    width: 'calc(100% + 32px)',
    textAlign: 'center',
    marginLeft: '-16px',
    height: '56px',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none !important',
    },
    scrollbarWidth: 'none',
    overflowStyle: 'none',
    position: 'absolute',
    bottom: '70px',
  },
  fontPropButtonFont: {
    justifyContent: 'flex-start',
    padding: '0 20px',
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
    zIndex: 100,
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
const cardStyle = (bgColor, bgImage) => {
  return {
    backgroundColor: `${bgColor}`,
    backgroundImage: `${!isEmpty(bgImage) && `url('${bgImage}')`}`,
    backgroundSize: `${!isEmpty(bgImage) && '100% 100% '}`,
    backgroundBlendMode: `${isEmpty(bgImage) && 'color-burn'}`,
  };
};
const FontFamilyButton = (props) => {
  const { currentFont, font, setFont } = props;
  const classes = useStyles({ currentFont });
  return (
    <button
      onClick={() => setFont(currentFont.family)}
      style={{ fontFamily: currentFont.family }}
      className={`${classes.fontPropButton} ${
        font === currentFont.family && classes.clickedFontPropButton
        }`}
    >
      {currentFont.name}
    </button>
  );
};
const ColorButton = (props) => {
  const { currentColor, color, setColor } = props;
  const classes = useStyles({ currentColor });
  return (
    <button
      onClick={() => setColor(currentColor)}
      className={`${classes.colorPropButton} ${
        color === currentColor && classes.clickedColorPropButton
        }`}
    ></button>
  );
};
const AlignButton = (props) => {
  const { currentSort, sort, setSort } = props;
  const classes = useStyles();
  return (
    <button
      className={classes.stylePropButton}
      onClick={() => setSort(currentSort.align)}
    >
      <img
        src={
          sort === currentSort.align
            ? `/icons/${currentSort.imgURL}_focus.png`
            : `/icons/${currentSort.imgURL}_normal.png`
        }
      ></img>
    </button>
  );
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
    backgroundImage,
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
          // style={cardStyle(backgroundColor, backgroundImage)}
          style={{
            fontFamily: `${font}`,
            // backgroundImage: `url('/images/bg_card.png')`,
            // backgroundSize: 'cover',
            // backgroundBlendMode: 'color-burn',
            backgroundColor: `${backgroundColor}`,
            backgroundImage: `${
              !isEmpty(backgroundImage) && `url('${backgroundImage}')`
              }`,
            backgroundSize: `${!isEmpty(backgroundImage) && 'cover '}`,
            backgroundBlendMode: `${isEmpty(backgroundImage) && 'color-burn'}`,
            backgroundRepeat: 'no-repeat',
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
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                document.execCommand('insertLineBreak');
              }
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
        {editMode === 'text' && (
          <div
            className={`${classes.fontPropButtonWrap} ${classes.fontPropButtonFont}`}
          >
            {FONT_FAMILY.map((value, idx) => {
              return (
                <FontFamilyButton
                  key={idx}
                  currentFont={value}
                  font={font}
                  setFont={setFont}
                />
              );
            })}
          </div>
        )}
        {editMode === 'sort' && (
          <div className={classes.fontPropButtonWrap}>
            {FONT_ALIGN.map((value, idx) => {
              return (
                <AlignButton
                  key={idx}
                  currentSort={value}
                  sort={sort}
                  setSort={setSort}
                />
              );
            })}
          </div>
        )}
        {editMode === 'color' && (
          <div className={classes.fontPropButtonWrap}>
            {FONT_COLORS.map((value, idx) => {
              return (
                <ColorButton
                  key={idx}
                  currentColor={value}
                  color={color}
                  setColor={setColor}
                />
              );
            })}
          </div>
        )}
        <div className={classes.editButtonBar}>
          <span
            style={{ margin: '0 10px 0 0' }}
            onClick={() => setEditMode('text')}
          >
            <img
              src={
                editMode === 'text'
                  ? '/icons/option_icon_font1_focus.png'
                  : '/icons/option_icon_font1_normal.png'
              }
              className={classes.menuButton}
            />
          </span>
          <span
            style={{ margin: '0 10px 0 10px' }}
            onClick={() => setEditMode('sort')}
          >
            <img
              src={
                editMode === 'sort'
                  ? '/icons/option_icon_text2_focus.png'
                  : '/icons/option_icon_text2_normal.png'
              }
              className={classes.menuButton}
            />
          </span>
          <span
            style={{ margin: '0 0 0 10px' }}
            onClick={() => setEditMode('color')}
          >
            <img
              src={
                editMode === 'color'
                  ? '/icons/option_icon_color3_focus.png'
                  : '/icons/option_icon_color3_normal.png'
              }
              className={classes.menuButton}
            />
          </span>
        </div>
      </Layouts>
    </Modal>
  );
};

export default FontModal;
