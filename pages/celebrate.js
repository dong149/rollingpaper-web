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
    fontSize: '34px',
    fontWeight: 'bold',
    lineHeight: '60px',
    marginTop: '100px',
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
          <div className={classes.main} style={{ marginBottom: '16px' }}>
            <span>지금까지</span>
            <br />
            <CountUp end={3243} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            <span>명이 작성하고</span>
            <br />
            <CountUp end={132} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            <span>명이 축하를</span>
            <br />
            <span>받았어요!</span>
          </div>
          <StickyFooter position="absolute">
            <Link
              href={{
                pathname: '/create',
              }}
            >
              <Buttons full={true}>다음</Buttons>
            </Link>
          </StickyFooter>
        </Layouts>
      </div>
    </div>
  );
};

export default Index;
