import React from "react";
import Link from "next/link";
import Paper from "../components/Paper";
import Head from "next/head";

const Write = () => {
  return (
    <div className="layout">
      <Head>
        <title>롤링 페이퍼</title>
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
      <h2>링크가 생성되었습니다. 친구들에게 공유하세요!</h2>
      <h3>https://rollingpaper/?donghoonryoo</h3>
      <Link href="/">
        <button>복사</button>
      </Link>
      <br />
      <Link href="/">
        <button>돌아가기</button>
      </Link>
      <Paper />
      <Paper />
    </div>
  );
};

export default Write;
