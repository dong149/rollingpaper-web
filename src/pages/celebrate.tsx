// 스플래쉬 뷰
import { makeStyles } from '@material-ui/core';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

import rollingService from '../api/rollingService';
import Buttons from '../components/Buttons';
import Layouts from '../components/Layouts';
import StickyFooter from '../components/StickyFooter';

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

interface Props {
  posts: {
    rollingPaperContent: number;
    rollingPaper: number;
  }
}

const Index = ({ posts }: Props) => {
  const classes = useStyles();
  const rollingPaperContent = posts.rollingPaperContent + 500;
  const rollingPaper = posts.rollingPaper + 50;

  return (
    <div>
      <Head>
        <title>롤링 페이퍼 :: 특별한 온라인 선물</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1 ,user-scalable=no, maximum-scale=1'
        />
        <meta name='description' content='롤링 페이퍼 쉽게 만들기' />
        <meta
          name='keywords'
          content='롤링페이퍼,선물,생일,여자친구,100일,친구'
        />
      </Head>

      <div className={ `section ${classes.sectionWrapper}` }>
        <Layouts>
          <div className={ classes.main } style={{ marginBottom: '16px' }}>
            <span>지금까지</span>
            <br />
            <CountUp end={ rollingPaperContent } redraw={ true }>
              { ({ countUpRef, start }) => (
                <VisibilitySensor onChange={ start } delayedCall>
                  <span ref={ countUpRef } />
                </VisibilitySensor>
              ) }
            </CountUp>
            <span>명이 작성하고</span>
            <br />
            <CountUp end={ rollingPaper } redraw={ true }>
              { ({ countUpRef, start }) => (
                <VisibilitySensor onChange={ start } delayedCall>
                  <span ref={ countUpRef } />
                </VisibilitySensor>
              ) }
            </CountUp>
            <span>명이 축하를</span>
            <br />
            <span>받았어요!</span>
          </div>
          <StickyFooter position='absolute'>
            <Link
              href={{
                pathname: '/create',
              }}
            >
              <Buttons full={ true }>다음</Buttons>
            </Link>
          </StickyFooter>
        </Layouts>
      </div>
    </div>
  );
};

Index.getInitialProps = async () => {
  const res = await rollingService.getCount();

  return {
    posts: res.data,
  };
};
export default Index;
