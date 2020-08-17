import React, { useState, useEffect } from 'react';
import Layouts from '../../components/Layouts';
import Buttons from '../../components/Buttons';
import StickyFooter from '../../components/StickyFooter';
import { makeStyles } from '@material-ui/core';
import Link from 'next/link';
const useStyles = makeStyles({
  main: {
    textAlign: 'left',
    fontSize: '30px',
    fontWeight: 'bold',
    lineHeight: '48px',
    marginTop: '25px',
  },
  rolling: {
    width: '343px',
    margin: '0 auto',
    marginTop: '24px',
  },
  iconWrapper: {
    display: 'block',
    background: 'transparent',
    border: 'none',
    margin: '0',
    padding: '0',
  },
  icons: {
    width: '16px',
  },
});
const Share = (props) => {
  const classes = useStyles();
  const { name, num } = props;
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('28ff1d35692191420def0e22e9d6941b');
    }
    window.Kakao.Link.createDefaultButton({
      container: '#kakao-link-btn',
      objectType: 'feed',
      content: {
        title: `${name}님을 위한 롤링페이퍼입니다!`,
        description: '1분으로 친구에게 감동을 선물해주세요',
        imageUrl:
          'https://github.com/dong149/image_resources/blob/master/rollingpaper/present.png?raw=true',
        link: {
          webUrl: `https://rollingpaper.site/sender/main?name=${name}&num=${num}`,
          mobileWebUrl: `https://rollingpaper.site/sender/main?name=${name}&num=${num}`,
        },
      },
      social: {
        likeCount: 3023,
        commentCount: 202,
        sharedCount: 303,
      },
      buttons: [
        {
          title: '쓰러 가기',
          link: {
            webUrl: `https://rollingpaper.site/sender/main?name=${name}&num=${num}`,
            mobileWebUrl: `https://rollingpaper.site/sender/main?name=${name}&num=${num}`,
          },
        },
      ],
      success: function (response) {
        console.log(response);
      },
      fail: function (error) {
        console.log(error);
      },
    }),
      window.Kakao.Link.createDefaultButton({
        container: '#kakao-link-btn-receiver',
        objectType: 'feed',
        content: {
          title: `${name}님 생일 축하드립니다!`,
          description: '당신만을 위한 세상에 하나 뿐인 롤링 페이퍼.',
          imageUrl:
            'https://github.com/dong149/image_resources/blob/master/rollingpaper/present.png?raw=true',

          link: {
            webUrl: `https://rollingpaper.site/receiver/splash?name=${name}&num=${num}`,
            mobileWebUrl: `https://rollingpaper.site/receiver/splash?name=${name}&num=${num}`,
          },
        },
        social: {
          likeCount: 100,
          commentCount: 202,
          sharedCount: 303,
        },
        buttons: [
          {
            title: '열어보기',
            link: {
              webUrl: `https://rollingpaper.site/receiver/splash?name=${name}&num=${num}`,
              mobileWebUrl: `https://rollingpaper.site/receiver/splash?name=${name}&num=${num}`,
            },
          },
        ],
        success: function (response) {
          console.log(response);
        },
        fail: function (error) {
          console.log(error);
        },
      });
  });

  return (
    <Layouts>
      <Link
        href={{
          pathname: '/sender/main',
          query: { name: name, num: num },
        }}
      >
        <a className={classes.iconWrapper}>
          <img
            src="/icons/back-icon-small.png"
            alt="뒤로가기"
            className={classes.icons}
          />
        </a>
      </Link>
      <div className={classes.main}>
        <span>누구에게</span>
        <br />
        <span>공유하세요?</span>
      </div>
      <img
        className={classes.rolling}
        src="/gif/share.gif"
        alt="롤링페이퍼 메인 이미지"
      />
      <StickyFooter>
        <a id="kakao-link-btn" style={{ width: '100%', marginBottom: '16px' }}>
          <Buttons full={true} light={true}>
            준비하는 친구들에게 공유
          </Buttons>
        </a>
        <a
          id="kakao-link-btn-receiver"
          style={{ width: '100%', marginBottom: '16px' }}
        >
          <Buttons full={true}>주인공에게 공유</Buttons>
        </a>
      </StickyFooter>
    </Layouts>
  );
};

Share.getInitialProps = async (context) => {
  const name = context.query.name;
  const num = context.query.num;
  return {
    name: name,
    num: num,
  };
};

export default Share;
