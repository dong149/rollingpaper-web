import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import rollingService from '../services/rollingService';
import Modal, {
  ModalTitie,
  ModalButtonWrapper,
  ModalButton,
  ModalFullButton,
} from './Modal';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(100% + 32px)',
    minHeight: 'calc(100vh - 150px)',
    marginLeft: '-16px',
    padding: '25px 0 169px',
    overflow: 'hidden',
    background: '#fff',
    borderTopLeftRadius: '28px',
    borderTopRightRadius: '28px',
  },
  card: {
    display: '-webkit-box',
    overflow: 'hidden',
    width: '123px',
    height: '169px',
    // background: (props) => props.bgColor,
    padding: '10px',
    borderRadius: '13px',
    lineHeight: '1.5em',
    wordBreak: 'break-all',
    textOverflow: 'ellipsis',
    lineClamp: 7,
    boxOrient: 'vertical',
    textDecoration: 'none',
  },
  cardInner: {
    flex: 1,
    overflow: 'hidden',
    fontSize: '13px',
    textOverflow: 'ellipsis',
  },
}));

const styledRandom = (i, bgColor) => {
  // TODO: 좀 더 자연스러운 랜덤 화면 구현
  let hashKey = (13 / (i + 1) + 0.2) % 1;
  let x = Math.floor(hashKey * 40);
  let y = Math.floor(hashKey * 40);
  let rotate = Math.floor(hashKey * (i % 2 === 0 ? 30 : -30));
  return {
    transform:
      'rotate(' +
      rotate +
      'deg)' +
      ' translateX(' +
      x +
      'px)' +
      ' translateY(' +
      y +
      'px)',
    backgroundColor: `${bgColor}`,
  };
};

const Cards = (props) => {
  const classes = useStyles();
  const { name, num, content, linked, setIsPostsUpdated } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {content.map((value, i) => {
          return (
            <>
              <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
                <ModalTitie>
                  롤링페이퍼를
                  <br />
                  정말 삭제하실 건가요?
                </ModalTitie>
                <ModalButtonWrapper>
                  <ModalButton onClick={() => setModalIsOpen(false)}>
                    취소
                  </ModalButton>
                  <ModalButton
                    onClick={() => {
                      deletePost(value.id).then((res) => {
                        setModalIsOpen(false);
                        if (res === 200) setSuccessModalIsOpen(true);
                        setIsPostsUpdated(true);
                      });
                    }}
                    focus
                  >
                    삭제
                  </ModalButton>
                </ModalButtonWrapper>
              </Modal>
              <Modal
                modalIsOpen={successModalIsOpen}
                setModalIsOpen={setSuccessModalIsOpen}
              >
                <ModalTitie>삭제되었습니다.</ModalTitie>
                <ModalButtonWrapper>
                  <ModalFullButton onClick={() => setSuccessModalIsOpen(false)}>
                    확인
                  </ModalFullButton>
                </ModalButtonWrapper>
              </Modal>
              <Grid
                item
                xs={4}
                key={i}
                // onClick={() => {
                //   setModalIsOpen(true);
                // }}
              >
                {linked ? (
                  <Link
                    href={{
                      pathname: '/receiver/detail',
                      query: { name: name, num: num, index: i },
                    }}
                  >
                    <a
                      elevation={0}
                      className={classes.card}
                      style={styledRandom(i, value.backgroundColor)}
                    >
                      <p
                        className={classes.cardInner}
                        style={{
                          color: value.color,
                          fontFamily: value.font,
                          textAlign: value.sort,
                        }}
                      >
                        {value.content}
                      </p>
                    </a>
                  </Link>
                ) : (
                  <Link
                    href={{
                      pathname: '/sender/detail',
                      query: { name: name, num: num, index: i },
                    }}
                  >
                    <a
                      elevation={0}
                      className={classes.card}
                      style={styledRandom(i, value.backgroundColor)}
                    >
                      <p
                        className={classes.cardInner}
                        style={{
                          color: value.color,
                          fontFamily: value.font,
                          textAlign: value.sort,
                        }}
                      >
                        {value.content}
                      </p>
                    </a>
                  </Link>
                )}
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
};

const deletePost = async (rolling_id) => {
  console.log(rolling_id);

  try {
    await rollingService.deleteRollingContent(rolling_id);
    return 200;
  } catch (error) {
    return 400;
  }
};

export default Cards;
