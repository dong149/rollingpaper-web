// 스플래쉬 뷰
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Buttons from '../components/Buttons';
import StickyFooter from '../components/StickyFooter';
import Layouts from '../components/Layouts';
import { makeStyles } from '@material-ui/core';
import ReactFullpage from '@fullpage/react-fullpage';
import AutosizeInput from 'react-input-autosize';
import { isEmpty } from '../functions';
import rollingService from '../services/rollingService';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
const useStyles = makeStyles({
  main: {
    width: '100%',
    textAlign: 'left',
    fontSize: '32px',
    fontWeight: 'bold',
    lineHeight: '46px',
  },
  sectionWrapper: {
    position: 'relative',
    minHeight: '100vh',
  },
  rolling: {
    width: '100%',
    marginTop: '48px',
    marginBottom: '87px',
  },
});
const Index = () => {
  const classes = useStyles();
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
            <span>롤링페이퍼로</span>
            <br />
            <span>마음을 선물하세요.</span>
          </div>
          <img
            className={classes.rolling}
            src="/images/pen.jpeg"
            alt="롤링페이퍼 메인 이미지"
          />
          <StickyFooter position="absolute">
            <Link
              href={{
                pathname: '/celebrate',
              }}
            >
              <Buttons full={true}>롤링페이퍼 생성 및 조회하기</Buttons>
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

export default Index;
