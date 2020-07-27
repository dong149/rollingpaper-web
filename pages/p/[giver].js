import React, { useState, useEffect } from "react";
import Link from "next/link";
import Paper from "../../components/Paper";
import { useRouter } from "next/router";
import { isEmpty } from "../../functions";
import { CopyToClipboard } from "react-copy-to-clipboard";
import rollingService from "../../services/rollingService";
import "../../styles/home.scss";
import "../../styles/papers.scss";
import Head from "next/head";
import ReactFullpage from "@fullpage/react-fullpage";
import dynamic from "next/dynamic";

const ParticlesBg = dynamic(() => import("particles-bg"), { ssr: false });
// import ParticlesBg from "particles-bg";
const Giver = (props) => {
  const { rollings, name, password, id } = props;
  // console.log(rollings);
  console.log("name:", name);
  console.log("password", password);
  console.log("id", id);
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  let encName = encodeURI(name);
  // console.log(name);

  return (
    <div className="rolling-paper">
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
      {/* <header className="intro">
        <h1>{name} 님</h1>
        <h2>생일 축하드려요!</h2>
      </header>
      <div className="papers">
        {rollings.map((object) => {
          if (object.name === name) {
            return (
              <Paper key={object._id} name={name} content={object.content} />
            );
          }
        })}
      </div> */}
      <ReactFullpage
        slidesNavigation
        contorlArrows={true}
        dragAndMove={true}
        render={() => {
          return (
            <ReactFullpage.Wrapper>
              <ParticlesBg color="#ffff00" num={2} type="fountain" bg={true} />
              <div className="section section-first">
                <header className="intro">
                  <h1>{name} 님</h1>
                  <h2>생일 축하드려요!</h2>
                </header>
                {/* <div className="allow">
                  <span>▼</span>
                </div> */}
              </div>
              <div className="section">
                {rollings.map((object) => {
                  return (
                    <div className="slide">
                      <Paper
                        key={object._id}
                        name={name}
                        content={object.content}
                        author={object.author}
                        color={object.color}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="section"></div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
};

Giver.getInitialProps = async (context) => {
  // const name = context.query.giver;
  // const password = context.asPath.split("?")[1];
  // const id = context.asPath.split("%3f")[2];
  const name = context.query.name;
  const password = context.query.pw;
  const id = context.query.id;

  const res = await rollingService.getRollingContent(id);

  return {
    rollings: res,
    name: name,
    password: password,
    id: id,

    // context: context,
  };
};

export default Giver;
