// 준비자가 보는 페이지
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Post from "../components/Post";
import { useRouter } from "next/router";
import { isEmpty } from "../functions";
import { CopyToClipboard } from "react-copy-to-clipboard";
import rollingService from "../services/rollingService";
import "../styles/home.scss";
import "../styles/post.scss";
import Head from "next/head";
import ReactFullpage from "@fullpage/react-fullpage";
const Papers = (props) => {
  const { rolling, name, password } = props;
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [contents, setContents] = useState([]);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("#f64c71");
  const [next, setNext] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const [test, setTest] = useState();

  let encName = encodeURI(name);

  useEffect(() => {
    const getContents = async () => {
      try {
        setContents(rolling);

        if (!isEmpty(rolling)) {
          setCount(rolling.length);
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    getContents();
  }, [isSubmit]);
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("28ff1d35692191420def0e22e9d6941b");
    }

    window.Kakao.Link.createDefaultButton({
      container: "#kakao-link-btn",
      objectType: "feed",
      content: {
        title: `${name}님을 위한 롤링페이퍼입니다!`,
        description: "1분으로 친구에게 감동을 선물해주세요",
        imageUrl:
          "https://github.com/dong149/image_resources/blob/master/rollingpaper/present.png?raw=true",
        link: {
          webUrl: `https://rollingpaper.site/${name}?${password}`,
          mobileWebUrl: `https://rollingpaper.site/${name}?${password}`,
        },
      },
      social: {
        likeCount: 3023,
        commentCount: 202,
        sharedCount: 303,
      },
      buttons: [
        {
          title: "쓰러 가기",
          link: {
            webUrl: `https://rollingpaper.site/${name}?${password}`,
            mobileWebUrl: `https://rollingpaper.site/${name}?${password}`,
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
    window.Kakao.Link.createDefaultButton({
      container: "#kakao-link-btn-receiver",
      objectType: "feed",
      content: {
        title: `${name}님 생일 축하드립니다!`,
        description: "당신만을 위한 세상에 하나 뿐인 롤링 페이퍼.",
        imageUrl:
          "https://github.com/dong149/image_resources/blob/master/rollingpaper/present.png?raw=true",

        link: {
          webUrl: `https://rollingpaper.site/p/[receiver]?name=${name}&pw=${password}`,
          mobileWebUrl: `https://rollingpaper.site/p/[receiver]?name=${name}&pw=${password}`,
        },
      },
      social: {
        likeCount: 100,
        commentCount: 202,
        sharedCount: 303,
      },
      buttons: [
        {
          title: "열어보기",
          link: {
            webUrl: `https://rollingpaper.site/p/[receiver]?name=${name}&pw=${password}`,
            mobileWebUrl: `https://rollingpaper.site/p/[receiver]?name=${name}&pw=${password}`,
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
  }, []);
  const onSubmit = async () => {
    try {
      if (isEmpty(content) || isEmpty(author)) {
        setError("※글과 글쓴이를 모두 입력해주세요.");
        return;
      }
      await rollingService
        // .postRollingContent({
        //   name: name,
        //   content: content,
        //   author: author,
        //   password: password,
        //   rolling_id: id,
        //   color: color,
        // })
        .postRollingContent({
          image
        })
        .then((res) => {
          alert("성공적으로 등록되었습니다.");
          setContent("");
          setAuthor("");
          setColor("#f64c71");
          setIsSubmit(true);
          setIsSubmit(false);
          // window.location.reload();
        });
    } catch (err) {
      console.log(err);
      return;
    }
  };
  return (
    <div className="layout">
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
        render={({ fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section">
                <div className="layout">
                  <div className="question-text">to. {name}님</div>
                  <br />
                  <div className="question-text">현재까지 {count}명 작성</div>
                  <div
                    className="create-btn"
                    onClick={() => {
                      fullpageApi.moveSectionDown();
                    }}
                  >
                    <span>작성하기</span>
                  </div>
                  <a id="kakao-link-btn" className="share-btn">
                    <div name={name}>
                      <span>카카오톡으로 작성페이지 공유</span>
                    </div>
                  </a>
                  <CopyToClipboard
                    text={`https://rollingpaper.site/${encName}/?${encodeURI(
                      password
                    )}`}
                    onCopy={() => setCopied(true)}
                    className="create-btn"
                  >
                    <span>작성페이지 링크 복사</span>
                  </CopyToClipboard>
                  <Link
                    href={`/p/[receiver]?name=${name}&pw=${password}`}
                    as={`/p/[receiver]?name=${name}&pw=${password}`}
                  >
                    <div className="create-btn" name={name}>
                      <span>롤링페이지 현황 보기</span>
                    </div>
                  </Link>
                  <a id="kakao-link-btn-receiver" className="present-btn">
                    <div>
                      <span>주인공에게 보내기</span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="section">
                <div className="slide">
                  <div className="content">
                    <span className="content-header">to {name}</span>
                    <div className="content-input-wrap">
                      <textarea
                        className="content-input"
                        rows="10"
                        value={content}
                        placeholder={`여기에 ${name}님에게 남기고 싶으신 말을 편하게 작성해주시면 됩니다.`}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="author">
                    <div className="author-input-wrap">
                      <input
                        type="text"
                        value={author}
                        className="author-input"
                        placeholder="홍길동"
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </div>
                    <span className="author-text">올림</span>
                  </div>
                  {!isEmpty(content) ? (
                    !isEmpty(author) ? (
                      <div
                        className="preview-btn"
                        onClick={() => {
                          setNext(true);
                          fullpageApi.moveSlideRight();
                        }}
                      >
                        <span>제출하기</span>
                      </div>
                    ) : (
                      <div
                        style={{ backgroundColor: "#222222", color: "#fffeef" }}
                        className="preview-btn"
                      >
                        <span>※작성자도 입력해주세요!</span>
                      </div>
                    )
                  ) : (
                    <div
                      style={{ backgroundColor: "#222222", color: "#fffeef" }}
                      className="preview-btn"
                    >
                      <span>제출하기</span>
                    </div>
                  )}
                </div>
                <div className="slide">
                  <div className="layout">
                    <div className="question-text">
                      어떤 색으로
                      <br />
                      만들까요?
                    </div>
                    <div className="color">
                      <Color
                        boxColor="#f64c71"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                      <Color
                        boxColor="#3500d3"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                      <Color
                        boxColor="#afd"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                      <Color
                        boxColor="#e3afbc"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                      <Color
                        boxColor="#d79922"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                      <Color
                        boxColor="#c5cbe3"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                      <Color
                        boxColor="#123c69"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                      <Color
                        boxColor="#e98074"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                      <Color
                        boxColor="#5680e9"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                      <Color
                        boxColor="#5ab9ea"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                      <Color
                        boxColor="#8860d0"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                      <Color
                        boxColor="#2e9cca"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                      <Color
                        boxColor="#3aafa9"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                      <Color
                        boxColor="#f8e9a1"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                      <Color
                        boxColor="#17e9e0"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                      <Color
                        boxColor="#faed26"
                        chooseColor={(temp) => {
                          setColor(temp);
                        }}
                        currentColor={color}
                      />
                    </div>
                    {next ? (
                      <div
                        className="create-btn"
                        name={name}
                        style={{ backgroundColor: `${color}` }}
                        onClick={() => {
                          onSubmit();
                          fullpageApi.moveSlideLeft();
                          fullpageApi.moveSectionUp();
                        }}
                      >
                        <span>제출하기</span>
                      </div>
                    ) : (
                      <div className="inactive-create-btn" name={name}>
                        <span>위 내용을 작성해주세요!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* <div className="section">
                <div className="paper-head">
                  <span>{name}님</span>
                </div>
                <div className="paper-head">
                  <span>에게 보내는</span>
                </div>
                <div className="paper-head">
                  <span>
                    <span style={{ color: "#f64c71" }}>롤링페이퍼</span>입니다.
                  </span>
                </div>

                <div className="content">
                  <span className="content-header">to {name}</span>
                  <div className="content-input-wrap">
                    <textarea
                      className="content-input"
                      rows="10"
                      value={content}
                      placeholder={`여기에 ${name}님에게 남기고 싶으신 말을 편하게 작성해주시면 됩니다.`}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </div>
                <div className="author">
                  <div className="author-input-wrap">
                    <input
                      type="text"
                      value={author}
                      className="author-input"
                      placeholder="홍길동"
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                  <span className="author-text">올림</span>
                </div>
                {!isEmpty(content) ? (
                  !isEmpty(author) ? (
                    <div className="preview-btn" onClick={() => onSubmit()}>
                      <span>제출하기</span>
                    </div>
                  ) : (
                    <div
                      style={{ backgroundColor: "#222222", color: "#fffeef" }}
                      className="preview-btn"
                    >
                      <span>※작성자도 입력해주세요!</span>
                    </div>
                  )
                ) : (
                  <div
                    style={{ backgroundColor: "#222222", color: "#fffeef" }}
                    className="preview-btn"
                  >
                    <span>제출하기</span>
                  </div>
                )}
                <div className="next-btn">
                  <span>▼</span>
                </div>
              </div> */}

              {/* <Link href="/">
        <span className="back-btn">돌아가기</span>
      </Link> */}
            </ReactFullpage.Wrapper>
          );
        }}
      />

      {/* <h2>링크가 생성되었습니다. 친구들에게 공유하세요!</h2>

      <CopyToClipboard
        text={`https://rollingpaper.site/${encName}`}
        onCopy={() => setCopied(true)}
      >
        <span className="link">https://rollingpaper.site/{encName}</span>
      </CopyToClipboard> */}

      {/* {rollings.map((object) => {
        if (object.name === name) {
          return (
            <Paper key={object._id} name={name} content={object.content} />
          );
        }
      })} */}
    </div>
  );
};

export const Color = (props) => {
  const { boxColor, chooseColor, currentColor } = props;
  return (
    <>
      {boxColor === currentColor ? (
        <div
          onClick={() => {
            chooseColor(boxColor);
          }}
          className="color-box"
          style={{
            backgroundColor: `${boxColor}`,
            boxShadow: `0 30px 60px 12px rgba(0, 0, 33, 0.2),
            0 4px 24px 0 rgba(0, 0, 33, 0.2), 0 0 1px 0 rgba(0, 0, 33, 0.2)`,
          }}
        ></div>
      ) : (
        <div
          onClick={() => {
            chooseColor(boxColor);
          }}
          className="color-box"
          style={{ backgroundColor: `${boxColor}` }}
        ></div>
      )}
    </>
  );
};

Papers.getInitialProps = async (context) => {
  const name = context.query.papers;
  const password = context.asPath.split("?")[1];
  console.log(name, password);
  const res = await rollingService.getRollingByName(name, password);
  console.log(res);
  return {
    rolling: res.data,
    name: name,
    password: password
  };
};

export default Papers;
