// 스플래쉬 뷰
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Paper from "../components/Post";
import "../styles/home.scss";
import "../styles/post.scss";
import Head from "next/head";
import ReactFullpage from "@fullpage/react-fullpage";
import Start from "./start";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
const Index = () => {
  const [img1Load, setImg1Load] = useState(false);
  const [img2Load, setImg2Load] = useState(false);
  const [img3Load, setImg3Load] = useState(false);
  const image1 = useRef();
  const image2 = useRef();
  const image3 = useRef();

  useEffect(() => {
    if (image1.current.complete) setImg1Load(true);
    if (image2.current.complete) setImg2Load(true);
    if (image3.current.complete) setImg3Load(true);
  }, []);
  // const afterLoad = (origin, destination, direction) => {
  //   console.log("afterLoad", { origin, destination, direction });
  // };
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
        // anchors={["main", "intro", "input1", "input2", "input3", "finish"]}
        // normalScrollElements="#input1 .layout"
        v2compatible={true}
        // interlockedSlides={["intro", "input1"]}
        // scrollBar={true}
        // navigation={true}
        render={({ state, fullpageApi }) => {
          console.log(fullpageApi);

          return (
            <ReactFullpage.Wrapper>
              <div className="section">
                <div className="layout">
                  <img
                    className={img1Load ? `lefthanders` : `lefthanders-unload`}
                    ref={image1}
                    src="/lefthanders.jpeg"
                    alt="왼손잡이들 로고"
                    onLoad={() => {
                      setImg1Load(true);
                    }}
                  />

                  <img
                    className={img2Load ? `logo` : `logo-unload`}
                    src="/pen.jpeg"
                    ref={image2}
                    alt="롤링페이퍼 메인"
                    onLoad={() => {
                      setImg2Load(true);
                    }}
                  />
                  <img
                    className={img3Load ? `logo` : `logo-unload`}
                    // className="logo"
                    ref={image3}
                    src="/rolling.jpeg"
                    alt="롤링페이퍼 로고"
                    onLoad={() => {
                      setImg3Load(true);
                    }}
                  />

                  <div
                    className="start-btn"
                    // onClick={() => fullpageApi.moveSectionDown()}
                  >
                    <span>▼</span>
                  </div>
                </div>
              </div>
              <div className="section">
                <div className="layout">
                  <div className="question-text">
                    지금까지
                    <br />
                    <CountUp end={3243} redraw={true}>
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span ref={countUpRef} />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                    명이 작성하고
                    <br />
                    <CountUp end={132} redraw={true}>
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span ref={countUpRef} />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                    명이 축하를
                    <br />
                    받았어요!
                  </div>

                  <div className="start-btn">
                    <span>▼</span>
                  </div>
                </div>
              </div>
              <Start fullpageApi={fullpageApi} />
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
};

export default Index;
