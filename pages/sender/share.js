import React, { useState, useEffect } from 'react';
import Layouts from '../../components/Layouts';
import Buttons from '../../components/Buttons';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
  main: {
    width: '100%',
    textAlign: 'left',
    fontSize: '32px',
    fontWeight: 'bold',
    lineHeight: '46px',
  },
  rolling: {
    width: '100%',
    marginTop: '48px',
    marginBottom: '87px',
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
      //   window.Kakao.Link.createDefaultButton({
      //     container: '#kakao-link-btn-receiver',
      //     objectType: 'feed',
      //     content: {
      //       title: `${name}님 생일 축하드립니다!`,
      //       description: '당신만을 위한 세상에 하나 뿐인 롤링 페이퍼.',
      //       imageUrl:
      //         'https://github.com/dong149/image_resources/blob/master/rollingpaper/present.png?raw=true',

      //       link: {
      //         webUrl: `https://rollingpaper.site/p/[receiver]?name=${name}&pw=${password}&id=${id}`,
      //         mobileWebUrl: `https://rollingpaper.site/p/[receiver]?name=${name}&pw=${password}&id=${id}`,
      //       },
      //     },
      //     social: {
      //       likeCount: 100,
      //       commentCount: 202,
      //       sharedCount: 303,
      //     },
      //     buttons: [
      //       {
      //         title: '열어보기',
      //         link: {
      //           webUrl: `https://rollingpaper.site/p/[receiver]?name=${name}&pw=${password}&id=${id}`,
      //           mobileWebUrl: `https://rollingpaper.site/p/[receiver]?name=${name}&pw=${password}&id=${id}`,
      //         },
      //       },
      //     ],
      //     success: function (response) {
      //       console.log(response);
      //     },
      //     fail: function (error) {
      //       console.log(error);
      //     },
      //   });
    });
  });
  return (
    <Layouts>
      <div className={classes.main}>
        <span>누구에게</span>
        <br />
        <span>공유하세요?</span>
      </div>
      <img
        className={classes.rolling}
        src="/images/pen.jpeg"
        alt="롤링페이퍼 메인 이미지"
      />
      <a id="kakao-link-btn" style={{ width: '100%', marginBottom: '16px' }}>
        <Buttons content="준비하는 친구들에게 공유" full={true} />
      </a>
      <Buttons content="주인공에게 공유" full={true} light={true} />
    </Layouts>
  );
};

Share.getInitialProps = async (context) => {
  const name = context.query.name;
  const num = context.query.num;
  // const res = await rollingService.getRollingByName(name, num);
  return {
    // rolling: res[0],
    name: name,
    num: num,
  };
};

export default Share;
