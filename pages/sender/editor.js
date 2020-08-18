// 에디터 페이지입니다.
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Link from 'next/link';
import Layouts from '../../components/Layouts';
import Header from '../../components/Header';
import StickyFooter from '../../components/StickyFooter';
import Buttons from '../../components/Buttons';
import dynamic from 'next/dynamic';
import FontModal from '../../components/FontModal';
import ColorModal from '../../components/ColorModal';
import ContentEditable from 'react-contenteditable';
import rollingService from '../../services/rollingService';
import { isEmpty } from '../../functions';
import Modal, {
  ModalTitie,
  ModalFullButton,
  ModalButtonWrapper,
} from '../../components/Modal';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    flexDirection: 'column',
    background: '#FFF',
  },
  textarea: {
    display: 'flex',
    margin: '0 auto',
    width: '90%',
    // height: '340px',
    marginTop: '30px',
    // padding: '16px',
    borderRadius: '13px',
    // backgroundColor: '#f2f2f2',
    textAlign: 'center',
    wordBreak: 'break-all',
    // backgroundImage: `url('/images/bg_card.png')`,
    // backgroundSize: 'cover',
    // backgroundBlendMode: 'color-burn',
    // backgroundRepeat: 'no-repeat',
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
      // TODO: 스크롤바 문제는 의견 물어보고 정할 것
      // '&::-webkit-scrollbar': {
      //   display: 'none',
      // },

      height: '340px',
    },
  },
  textareaImage: {
    display: 'flex',
    margin: '0 auto',
    width: '90%',
    // height: '340px',
    marginTop: '30px',
    // padding: '16px',
    borderRadius: '13px',
    // backgroundColor: '#f2f2f2',
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
      // TODO: 스크롤바 문제는 의견 물어보고 정할 것
      // '&::-webkit-scrollbar': {
      //   display: 'none',
      // },

      height: '340px',
    },
  },
  from: {
    width: '100%',
    marginTop: '28px',
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
  menuButton: {
    fontSize: '18px',
    lineHeight: '26px',
    fontWeight: 'bold',
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
  const [fontModalIsOpen, setFontModalIsOpen] = useState(false);
  const [colorModalIsOpen, setColorModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [font, setFont] = useState('NanumSquareRound');
  const [sort, setSort] = useState('center');
  const [color, setColor] = useState('black');
  const [backgroundColor, setBackgroundColor] = useState('#F4F4F4');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [imageFile, setImageFile] = useState();
  const [author, setAuthor] = useState('');
  const { name, num, id } = props;
  const classes = useStyles({ backgroundImage: backgroundImage });
  const onSubmit = async () => {
    try {
      await rollingService
        .postRollingContent(
          id,
          content,
          author,
          font,
          sort,
          color,
          backgroundColor,
          imageFile
        )
        .then((res) => {
          console.log(res);
          setSuccessModalIsOpen(true);
          setBackgroundImage('');
          setContent('');
          setAuthor('');
          return 200;
        });
    } catch (err) {
      console.log(err);
      return 400;
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
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        backgroundImage={backgroundImage}
      />
      <ColorModal
        colorModalIsOpen={colorModalIsOpen}
        setColorModalIsOpen={setColorModalIsOpen}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        backgroundImage={backgroundImage}
        setBackgroundImage={setBackgroundImage}
        imageFile={imageFile}
        setImageFile={setImageFile}
      />
      <Modal
        modalIsOpen={successModalIsOpen}
        setModalIsOpen={setSuccessModalIsOpen}
      >
        <ModalTitie>
          성공적으로
          <br />
          저장되었습니다.
        </ModalTitie>
        <ModalButtonWrapper>
          <ModalFullButton
            onClick={() => {
              setSuccessModalIsOpen(false);
              window.location.href = `/sender/main?name=${name}&num=${num}`;
            }}
          >
            확인
          </ModalFullButton>
        </ModalButtonWrapper>
      </Modal>
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
        <Link
          href={{
            pathname: '/sender/main',
            query: { name: name, num: num },
          }}
        >
          <span>
            <a className={classes.menuButton}>취소</a>
          </span>
        </Link>
        <div style={{ float: 'right' }}>
          <span onClick={() => setFontModalIsOpen(true)}>
            <img style={{ width: '38px' }} src="/icons/text-icon.png"></img>
          </span>
          <span onClick={() => setColorModalIsOpen(true)}>
            <img
              style={{ width: '38px' }}
              src="/icons/background-icon.png"
            ></img>
          </span>
        </div>
      </div>

      <div
        className={`${
          isEmpty(backgroundImage) ? classes.textarea : classes.textareaImage
        }`}
        onClick={() => setFontModalIsOpen(true)}
        style={{
          fontFamily: `${font}`,
          backgroundColor: `${backgroundColor}`,
          backgroundImage: `${
            !isEmpty(backgroundImage) && `url(${backgroundImage})`
          }`,
          backgroundSize: 'cover',
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
      <div className={classes.from}>
        <span>From. </span>
        <div>
          <input
            type="text"
            value={author}
            placeholder="보내는이"
            maxLength="6"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
      </div>
      {!isEmpty(content) && !isEmpty(author) ? (
        <StickyFooter align="right">
          {/* <Link
            href={{
              pathname: '/sender/main',
              query: { name: name, num: num },
            }}
          > */}
          <Buttons onClick={() => onSubmit()}>저장</Buttons>
          {/* </Link> */}
        </StickyFooter>
      ) : (
        <StickyFooter align="right">
          <Buttons>글과 작성자를 입력해주세요.</Buttons>
        </StickyFooter>
      )}
    </Layouts>
  );
};
Editor.getInitialProps = async (context) => {
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
