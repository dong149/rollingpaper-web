import React, { useState, useEffect } from 'react';
import Layouts from '../../components/Layouts';
import { makeStyles } from '@material-ui/core/styles';
import rollingService from '../../services/rollingService';
import Header from '../../components/Header';
import Cards from '../../components/Cards';
import Buttons from '../../components/Buttons';
import Link from 'next/link';

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
    width: '100%',
    padding: '0 9px',
    marginBottom: '30px',
  },
  cardWrapper: {
    marginTop: '14px',
    background: '#FFF',
  },
  title: {
    margin: '0',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  buttonSmall: {
    display: 'inline-block',
    minWidth: '87px',
    height: '35px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#000',
    border: '1px solid #000',
    borderRadius: '10px',
    background: 'transparent',
  },
}));
const Main = (props) => {
  const classes = useStyles();
  const { rolling, name, num } = props;
  console.log('rolling, name, num의 props 값 : ', rolling, name, num);

  return (
    <Layouts className={classes.root} bgColor="#F7F7F7">
      <Header>
        <div>
          <h2 className={classes.title}>to. 류동훈님</h2>
          <p className={classes.subtitle}>
            {cardList.length
              ? `총 ${cardList.length}명에게 축하를 받았어요!`
              : `아직 아무도 작성하지 않았어요!`}
          </p>
        </div>
        <Link
          href={{
            pathname: '/sender/share',
            query: { name: name, num: num },
          }}
        >
          <button className={classes.buttonSmall}>공유하기</button>
        </Link>
      </Header>
      <div className={classes.cardWrapper}>
        {cardList.length ? (
          <Cards content={cardList} linked={false} />
        ) : (
          <div>더미</div>
        )}
      </div>
      <div className={classes.boxWrapper}>
        <Link
          href={{
            pathname: '/sender/editor',
            query: { name: name, num: num },
          }}
        >
          <Buttons content="롤링페이퍼 작성하기" full={true} />
        </Link>
      </div>
    </Layouts>
  );
};

Main.getInitialProps = async (context) => {
  const name = context.query.name;
  const num = context.query.num;
  const res = await rollingService.getRollingByName(name, num);

  return {
    rolling: res.data,
    name: name,
    num: num,
  };
};

export default Main;
