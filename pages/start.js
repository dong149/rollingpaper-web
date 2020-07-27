import React, { useState, useEffect } from "react";
import Link from "next/link";
import { isEmpty } from "../functions";
import Paper from "../components/Paper";
import Head from "next/head";
import "../styles/papers.scss";
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
  // const [password1, setPassword1] = useState("");
  // const [password2, setPassword2] = useState("");
  const [error, setError] = useState(0);
  // useEffect(() => {
  //   if (!window.Kakao.isInitialized()) {
  //     window.Kakao.init("28ff1d35692191420def0e22e9d6941b");
  //   }
  // }, []);

  const onSubmit = async () => {
    let temp = {};
    try {
      // if (isEmpty(content)) {
      //   setError("※글과 글쓴이를 모두 입력해주세요.");
      //   return;
      // }
      await rollingService
        .getRollingByName(name, password)
        .then(async (res) => {
          console.log(res);
          if (!isEmpty(res)) {
            setError(1);
            // alert("이미 생성된 롤링페이퍼입니다.");
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
              // window.location.reload();
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
      {/* 이벤트 종류 선택하기 */}
      {/* <div className="section">
        <div className="layout">
          <img className="question-logo" src="/q.jpeg" alt="질문" />
          <div className="question">
            <span className="question-text">어떤</span>
          </div>
          <div className="question">
            <span className="question-text">이벤트를 준비하세요?</span>
          </div>
          <div className="question-info">
            <span>※필수입니다.</span>
          </div>
          <div className="event-select">
            <select name="job">
              <option value="">선택해주세요</option>
              <option value="생일">생일</option>
              <option value="기념일">기념일</option>
              <option value="기타">기타</option>
            </select>
          </div>
          {!isEmpty(name) ? (
            <Link href={`/[papers]`} as={`/${name}?${password1}`}>
              <div className="create-btn" name={name}>
                <span>다음</span>
              </div>
            </Link>
          ) : (
            // <button onClick={moveRoute}>시작하기</button>

            <div className="inactive-create-btn" name={name}>
              <span>작성해주세요</span>
            </div>
          )}
        </div>
      </div> */}

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
                // setNext(true);
                // fullpageApi.reBuild();
                // fullpageApi.setAllowScrolling(true, "right");
                setNext(true);
                // fullpageApi.setResponsive(true);
                fullpageApi.moveSectionDown();
              }}
            >
              <span>생성하기 혹은 조회하기</span>
            </div>
          ) : (
            // <button onClick={moveRoute}>시작하기</button>

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
      {/*      
      <div className="section">
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
              onClick={() => fullpageApi.moveSectionDown()}
            >
              <span>다음</span>
            </div>
          ) : (
            <div className="inactive-create-btn" name={name}>
              <span>위 내용을 작성해주세요!</span>
            </div>
          )}
        </div>
      </div>

      <div className="section">
        <div className="layout">
          <div className="question-text">
            주인공에게
            <br />
            전할 한 마디는
            <br />
            "
            <AutosizeInput
              inputStyle={{
                border: 0,
                fontSize: 35,
                outline: "none",
                display: "inline-block",
                padding: "0",
                fontWeight: "lighter",
              }}
              style={{
                borderBottom: "1px solid #333",
                display: "inline-block",
              }}
              maxLength="10"
              value={content}
              placeholder="간단하게 한 마디!"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            "
            <br />
            입니다.
          </div>
          {!isEmpty(content) ? (
            <div
              className="create-btn"
              onClick={() => {
                // onSubmit();
                // setNext(true);
                fullpageApi.moveSectionDown();
              }}
            >
              <span>다음</span>
            </div>
          ) : (
            // <button onClick={moveRoute}>시작하기</button>

            <div className="inactive-create-btn" name={name}>
              <span>작성해주세요</span>
            </div>
          )}
        </div>
      </div>
      <div className="section">
        <div className="layout">
          {next2 ? (
            <Link href={`/[papers]`} as={`/${name}?${password}`}>
              <div className="create-btn" name={name}>
                <span>링크 생성하기</span>
              </div>
            </Link>
          ) : (
            <div className="inactive-create-btn" name={name}>
              <span>위 내용을 작성해주세요!</span>
            </div>
          )}
        </div>
      </div> */}

      {/* <div className="section">
        <div className="layout">
          <img className="question-logo" src="/q.jpeg" alt="질문" />
          <div className="question">
            <span className="question-text">주인공의</span>
          </div>
          <div className="question">
            <span className="question-text">성함 혹은 애칭?</span>
          </div>
          <div className="name-input-wrap">
            <input
              className="name-input"
              type="text"
              placeholder="입력해주세요 (최대12자)"
              maxLength="12"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {!isEmpty(name) ? (
            <div
              className="create-btn"
              onClick={() => fullpageApi.moveSectionDown()}
            >
              <span>다음</span>
            </div>
          ) : (
            // <button onClick={moveRoute}>시작하기</button>

            <div className="inactive-create-btn" name={name}>
              <span>작성해주세요</span>
            </div>
          )}
        </div>
      </div> */}

      {/* <div className="section">
        <div className="layout">
          <img className="question-logo" src="/q.jpeg" alt="질문" />
          <div className="question">
            <span className="question-text">비밀번호를</span>
          </div>
          <div className="question">
            <span className="question-text">입력해주세요.</span>
          </div>
          <div className="question-info">
            <span>※동명이인을 가리기 위함이니,</span>
          </div>
          <div className="question-info">
            <span>어렵게 작성하시고 꼭 기억해주세요!</span>
          </div>
          <div className="name-input-wrap">
            <input
              className="name-input"
              type="password"
              placeholder="입력해주세요 (최대12자)"
              maxLength="12"
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div className="name-input-wrap">
            <input
              className="name-input"
              type="password"
              placeholder="한번 더 입력해주세요"
              maxLength="12"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          {!isEmpty(name) && !isEmpty(password1) && !isEmpty(password2) ? (
            <>
              {password1 !== password2 ? (
                <div className="inactive-create-btn" name={name}>
                  <span>※위 아래를 같게 해주세요</span>
                </div>
              ) : (
                <>
                  <div
                    className="create-btn"
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    <span>생성하기</span>
                  </div>
                  <Link href={`/[papers]`} as={`/${name}?${password1}`}>
                    <div className="create-btn" name={name}>
                      <span>이동하기</span>
                    </div>
                  </Link>
                </>
              )}
            </>
          ) : (
            // <button onClick={moveRoute}>시작하기</button>

            <div className="inactive-create-btn" name={name}>
              <span>작성해주세요</span>
            </div>
          )}
        </div>
      </div> */}
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
