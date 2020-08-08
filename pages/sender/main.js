import React, { useState, useEffect } from 'react';
import Layouts from '../../components/Layouts';
import { makeStyles } from '@material-ui/core/styles';
import rollingService from '../../services/rollingService';
import Header from '../../components/Header';
import StickyFooter from '../../components/StickyFooter';
import Cards from '../../components/Cards';
import Buttons from '../../components/Buttons';
import Link from 'next/link';

const cardList = Array(1).fill('카드'); // 임시 배열

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    flexDirection: 'column',
    background: '#F6F6F6',
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
  icon: {
    width: '24px',
    marginRight: '14px',
  },
}));
const Main = (props) => {
  const classes = useStyles();
  const { posts, name, num } = props;
  console.log('posts, name, num의 props 값 : ', posts, name, num);

  return (
    <Layouts className={classes.root} bgColor="#F7F7F7">
      <Header>
        <div>
          <h2 className={classes.title}>to. {name}님</h2>
          <p className={classes.subtitle}>
            {posts.length
              ? `총 ${posts.length}명에게 축하를 받았어요!`
              : `아직 아무도 작성하지 않았어요!`}
          </p>
        </div>
        <Link
          href={{
            pathname: '/sender/share',
            query: { name: name, num: num, id: rolling._id },
          }}
        >
          <button className={classes.buttonSmall}>공유하기</button>
        </Link>
      </Header>
      <div className={classes.cardWrapper}>
        {posts.length ? (
          <Cards content={posts} linked={false}/>
        ) : (
          <div>더미</div>
        )}
      </div>
      <StickyFooter position="sticky">
        <Link
          href={{
            pathname: '/sender/editor',
            query: { name: name, num: num },
          }}
        >
          <Buttons full={true}>
            <img
              src="/icons/write-light-icon.png"
              alt=""
              className={classes.icon}
            />
            롤링페이퍼 작성하기
          </Buttons>
        </Link>
      </StickyFooter>
    </Layouts>
  );
};

Main.getInitialProps = async (context) => {
  const name = context.query.name;
  const num = context.query.num;
  const res = await rollingService.getRollingByName(name, num);

  return {
    posts: res.data,
    name: name,
    num: num,
  };
};

export default Main;
