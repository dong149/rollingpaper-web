import React, { useState, useEffect } from 'react';
import Layouts from '../../components/Layouts';
import rollingService from '../../services/rollingService';
import Buttons from '../../components/Buttons';
import Link from 'next/link';
const Main = (props) => {
  const { rolling, name, num } = props;
  console.log(rolling, name, num);

  return (
    <Layouts>
      준비자 페이지 메인 페이지입니다.
      <Link
        href={{
          pathname: '/sender/share',
          query: { name: name, num: num },
        }}
      >
        <Buttons content="공유하기" full={true} />
      </Link>
      <Link
        href={{
          pathname: '/sender/editor',
          query: { name: name, num: num },
        }}
      >
        <Buttons content="에디터" full={true} />
      </Link>
    </Layouts>
  );
};

Main.getInitialProps = async (context) => {
  const name = context.query.name;
  const num = context.query.num;
  const res = await rollingService.getRollingByName(name, num);
  return {
    rolling: res[0],
    name: name,
    num: num,
  };
};

export default Main;
