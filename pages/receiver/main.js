import React, { useRef } from 'react';
import Layouts from '../../components/Layouts';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/Header';
import StickyFooter from '../../components/StickyFooter';
import Cards from '../../components/Cards';
import Buttons from '../../components/Buttons';
import { exportComponentAsPNG } from '../../functions';
import rollingService from '../../services/rollingService';

import Confetti from 'react-confetti';
const cardList = Array(30).fill('카드'); // 임시 배열

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    flexDirection: 'column',
    background: '#F6F6F6',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: '0 9px',
    marginBottom: '30px',
  },
  cardWrapper: {
    marginTop: '14px',
    background: '#FFF',
  },
  title: {
    margin: '0',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  icon: {
    width: '48px',
    marginRight: '14px',
  },
}));

const Main = (props) => {
  const classes = useStyles();
  const { posts, name, num } = props;
  console.log('props 값 - ', 'posts :', posts, 'name : ', name, 'num : ', num);
  const componentRef = useRef();
  const layoutRef = useRef();
  return (
    <body style={{ backgroundColor: '#F6F6F6' }}>
      <Confetti width={layoutRef.width} height={layoutRef.height} />
      <Layouts className={classes.root} bgColor="#F7F7F7">
        <Header>
          <div>
            <h2 className={classes.title}>to. {name}님</h2>
            <p className={classes.subtitle}>
              {posts.contents.length
                ? `총 ${posts.contents.length}명에게 축하를 받았어요!`
                : `아직 아무도 작성하지 않았어요!`}
            </p>
          </div>
          {/* TODO: 주인공 페이지에서 공유하기 버튼 임시 삭제 */}
          {/* <button className={classes.buttonSmall}>공유하기</button> */}
        </Header>
        <div className={classes.cardWrapper} ref={componentRef}>
          {posts.contents.length ? (
            <Cards name={name} num={num} content={posts.contents} linked />
          ) : (
            <div>더미</div>
          )}
        </div>
        <StickyFooter>
          <Buttons full onClick={() => exportComponentAsPNG(componentRef)}>
            <img
              src="/icons/download-light-icon.png"
              alt=""
              className={classes.icon}
            />
            이미지 다운받기
          </Buttons>
        </StickyFooter>
      </Layouts>
    </body>
  );
};

Main.getInitialProps = async (context) => {
  const name = context.query.name;
  const num = context.query.num;
  const res = await rollingService.getRollingByName(name, num);

  return {
    posts: res.data,
    name: name,
    num: num,
  };
};

export default Main;
