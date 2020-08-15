// 스플래쉬 뷰
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Buttons from '../../components/Buttons';
import StickyFooter from '../../components/StickyFooter';
import Layouts from '../../components/Layouts';
import { makeStyles } from '@material-ui/core';
import rollingService from '../../services/rollingService';
const useStyles = makeStyles({
  main: {
    width: '100%',
    textAlign: 'left',
    fontSize: '32px',
    fontWeight: 'bold',
    lineHeight: '46px',
    marginTop: '30px',
  },
  sectionWrapper: {
    position: 'relative',
    minHeight: '100vh',
  },
  rolling: {
    width: '322px',
    height: '379px',
    margin: '0 auto',
    marginTop: '3px',
    // marginBottom: '87px',
  },
});
const Splash = (props) => {
  const classes = useStyles();
  const { posts, name, num } = props;
  return (
    <div>
      <Head>
        <title>롤링 페이퍼 :: 특별한 온라인 선물</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 ,user-scalable=no, maximum-scale=1"
        />
        <meta name="description" content="롤링 페이퍼 쉽게 만들기" />
        <meta
          name="keywords"
          content="롤링페이퍼,선물,생일,여자친구,100일,친구"
        />
      </Head>
      <div className={`section ${classes.sectionWrapper}`}>
        <Layouts>
          <div className={classes.main}>
            <span>{posts.contents.length}명이 작성한</span>
            <br />
            <span>소중한 롤링페이퍼가</span>
            <br />
            <span>도착했어요!</span>
          </div>
          <img
            className={classes.rolling}
            src="/images/main.jpg"
            alt="롤링페이퍼 메인 이미지"
          />
          <StickyFooter position="absolute">
            <Link
              href={{
                pathname: '/receiver/main',
                query: { name: name, num: num },
              }}
            >
              <Buttons full={true}>롤링페이퍼 확인하기</Buttons>
            </Link>
            {/* <Buttons full={true} light={true}>
              내 롤링페이퍼 찾기
            </Buttons> */}
          </StickyFooter>
        </Layouts>
      </div>
    </div>
  );
};
Splash.getInitialProps = async (context) => {
  const name = context.query.name;
  const num = context.query.num;
  const res = await rollingService.getRollingByName(name, num);
  return {
    posts: res.data,
    name: name,
    num: num,
  };
};

export default Splash;
