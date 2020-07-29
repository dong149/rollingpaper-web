// 스플래쉬 뷰
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { isEmpty } from "../functions";
import Post from "../components/Post";
import Head from "next/head";
import "../styles/post.scss";
import rollingService from "../services/rollingService";
import AutosizeInput from "react-input-autosize";
const Start = (props) => {
  const { fullpageApi } = props;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("#f64c71");
  const [content, setContent] = useState("생일 축하드립니다");
  const [next, setNext] = useState(false);
  const [next2, setNext2] = useState(false);
  const [error, setError] = useState(0);

  const onSubmit = async () => {
    let temp = {};
    try {
      await rollingService
        .getRollingByName(name, password)
        .then(async (res) => {
          console.log(res);
          if (!isEmpty(res)) {
            setError(1);
            return;
          }
          await rollingService
            .postRolling({
              name: name,
              content: "생일 축하드립니다.",
              color: "#f64c71",
              password: password,
            })
            .then((res) => {
              setError(2);
              setContent("");
            });
        });
    } catch (err) {
      console.log(err);
      return;
    }
  };
  return (
    <>
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
      <div className="section">
        <div className="layout">
          <div className="question-text">
            받을 사람은
            <br />
            <AutosizeInput
              inputStyle={{
                border: 0,
                fontSize: 35,
                outline: "none",
                display: "inline-block",
                fontWeight: "lighter",
                padding: "0",
              }}
              style={{
                borderBottom: "1px solid #333",
                display: "inline-block",
              }}
              maxLength="10"
              value={name}
              placeholder="이름 혹은 애칭"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            이고
            <br />
            우리 롤페 암호는
            <br />
            <AutosizeInput
              type="password"
              inputStyle={{
                border: 0,
                fontSize: "35px",
                outline: "none",
                display: "inline-block",
                padding: "0",
                fontWeight: "lighter",
              }}
              style={{
                borderBottom: "1px solid #333",
                // color: "#D5D5D5",
                display: "inline-block",
              }}
              maxLength="10"
              value={password}
              placeholder="비밀번호"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            에요!
          </div>
          {!isEmpty(name) && !isEmpty(password) ? (
            <div
              className="create-btn"
              onClick={() => {
                onSubmit();
                setNext(true);

                fullpageApi.moveSectionDown();
              }}
            >
              <span>생성하기 혹은 조회하기</span>
            </div>
          ) : (
            <div className="inactive-create-btn" name={name}>
              <span>모두 작성해주세요</span>
            </div>
          )}
        </div>
      </div>
      <div className="section">
        <div className="layout">
          {error === 1 && <div className="question-text">이미 생성된 롤페</div>}
          {error === 2 && <div className="question-text">등록되었습니다.</div>}

          {next ? (
            <Link href={`/[papers]`} as={`/${name}?${password}`}>
              <div className="create-btn" name={name}>
                <span>이동하기</span>
              </div>
            </Link>
          ) : (
            <div className="inactive-create-btn" name={name}>
              <span>위 내용을 모두 작성해주세요.</span>
            </div>
          )}
        </div>
      </div>
    </>
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

export default Start;
