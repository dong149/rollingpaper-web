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
import { isEmpty } from '../utils';
import rollingService from '../api/rollingService';

const useStyles = makeStyles({
  main: {
    width: '100%',
    textAlign: 'left',
    fontSize: '34px',
    fontWeight: 'bold',
    lineHeight: '60px',
    marginTop: '60px',
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
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = async () => {
    try {
      await rollingService.postRolling(name, password).then(async (res) => {
        console.log(res);
        window.location.href = `/sender/main?name=${name}&num=${password}`;
      });
    } catch (err) {
      console.log(err);
      return;
    }
  };
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
            <span>받을 사람은</span>
            <br />
            <AutosizeInput
              inputStyle={{
                border: 0,
                fontSize: 34,
                outline: 'none',
                display: 'inline-block',
                fontWeight: 'lighter',
                padding: '0',
              }}
              style={{
                borderBottom: '1px solid #333',
                display: 'inline-block',
              }}
              maxLength="10"
              value={name}
              placeholder="이름 혹은 애칭"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <span>이에요.</span>
            <div style={{ height: '52px', width: '100%' }}></div>
            <span>우리만의 신호는</span>
            <br />
            <AutosizeInput
              type="password"
              inputStyle={{
                border: 0,
                fontSize: '34px',
                outline: 'none',
                display: 'inline-block',
                padding: '0',
                fontWeight: 'lighter',
              }}
              style={{
                borderBottom: '1px solid #333',
                // color: "#D5D5D5",
                display: 'inline-block',
              }}
              maxLength="10"
              value={password}
              placeholder="****"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span>이에요.</span>
          </div>
          <StickyFooter position="absolute">
            {!isEmpty(name) && !isEmpty(password) ? (
              <Buttons
                full={true}
                onClick={() => {
                  onSubmit();
                }}
              >
                생성 및 조회하기
              </Buttons>
            ) : (
                <Buttons full={true}>모두 작성해주세요</Buttons>
              )}
          </StickyFooter>
        </Layouts>
      </div>
    </div>
  );
};

export default Index;
