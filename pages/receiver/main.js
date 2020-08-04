import React from 'react';
import Layouts from '../../components/Layouts';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import Cards from '../../components/Cards';
import Buttons from '../../components/Buttons';

const cardList = Array(10).fill('카드'); // 임시 배열

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    flexDirection: 'column',
    background: '#F6F6F6',
  },
  boxWrapper: {
    position: 'fixed',
    width: 'calc(100% - 32px)',
    maxWidth: '412px',
    bottom: '16px',
    left: '50%',
    transform: 'translate(-50%, 0)',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: '45px',
    marginBottom: '30px',
  },
  cardWrapper: {
    background: '#FFF',
  },
  title: {
    fontSize: '28px',
  },
  subtitle: {
    fontSize: '16px',
  },
}));

const Main = () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Layouts className={classes.root}>
      <div className={classes.header}>
        <div>
          <strong className={classes.title}>to. 류동훈님</strong>
          <br />
          <span className={classes.subtitle}>
            총 {cardList.length}명에게 축하를 받았어요!
          </span>
        </div>
        <button>공유하기</button>
      </div>
      <div className={classes.cardWrapper}>
        <Cards content={cardList} />
      </div>
      <div className={classes.boxWrapper}>
        <Buttons content="이미지 다운받기" full />
      </div>
    </Layouts>
  );
};

export default Main;
