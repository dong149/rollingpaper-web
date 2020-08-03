// 스플래쉬 뷰
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Buttons from '../components/Buttons';
import Layouts from '../components/Layouts';
import { makeStyles } from '@material-ui/core';
import ReactFullpage from '@fullpage/react-fullpage';
import AutosizeInput from 'react-input-autosize';
import { isEmpty } from '../functions';
import rollingService from '../services/rollingService';
const useStyles = makeStyles({
  main: {
    width: '310px',
    textAlign: 'left',
    fontSize: '32px',
    fontWeight: 'bold',
    lineHeight: '46px',
  },
  rolling: {
    maxWidth: '310px',
    marginTop: '48px',
    marginBottom: '87px',
  },
});
const Index = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = async () => {
    console.log(name);
    console.log(password);
    let temp = {};
    try {
      await rollingService
        .getRollingByName(name, password)
        .then(async (res) => {
          console.log(res);
          if (!isEmpty(res)) {
            alert('이미존재');
            setError(1);
            return;
          }
          await rollingService
            .postRolling({
              name: name,
              color: '#f64c71',
              password: password,
            })
            .then((res) => {
              alert('성공');
              setError(2);
            });
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
      <ReactFullpage
        controlArrows={false}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section">
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
                  <Buttons content="롤링페이퍼 시작하기" full={true} />
                </Layouts>
              </div>
              <div className="section">
                <Layouts>
                  <div className={classes.main}>
                    <span>지금까지</span>
                    <br />
                    <span>3243명이 작성하고</span>
                    <br />
                    <span>132명이 축하를</span>
                    <br />
                    <span>받았어요!</span>
                  </div>
                  <Buttons content="다음" full={true} />
                </Layouts>
              </div>
              <div className="section">
                <Layouts>
                  <div className={classes.main}>
                    <span>받을 사람은</span>
                    <AutosizeInput
                      inputStyle={{
                        border: 0,
                        fontSize: 32,
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
                    <br />
                    <span>우리만의 신호는</span>
                    <br />
                    <AutosizeInput
                      type="password"
                      inputStyle={{
                        border: 0,
                        fontSize: '32px',
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
                  {!isEmpty(name) && !isEmpty(password) ? (
                    <Buttons
                      content="생성하기"
                      full={true}
                      onClick={() => {
                        console.log('dddd');
                        onSubmit();
                      }}
                    />
                  ) : (
                    <Buttons content="모두 작성해주세요" full={true} />
                  )}
                </Layouts>
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
};

export default Index;
