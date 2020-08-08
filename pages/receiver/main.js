import React, { useRef } from 'react';
import Layouts from '../../components/Layouts';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/Header';
import Cards from '../../components/Cards';
import Buttons from '../../components/Buttons';
import { exportComponentAsPNG } from '../../functions';
import rollingService from '../../services/rollingService';
const cardList = Array(30).fill('카드'); // 임시 배열

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    flexDirection: 'column',
    background: '#F6F6F6',
  },
  boxWrapper: {
    position: 'fixed',
    width: 'calc(100% - 32px)',
    maxWidth: '412px',
    bottom: '16px',
    left: '50%',
    transform: 'translate(-50%, 0)',
    boxSizing: 'border-box',
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
}));

const Main = (props) => {
  const classes = useStyles();
  const { posts, name, num } = props;
  console.log('props 값 - ', 'posts :', posts, 'name : ', name, 'num : ', num);
  const componentRef = useRef();
  return (
    <Layouts className={classes.root} bgColor="#F7F7F7">
      <Header>
        <div>
          <h2 className={classes.title}>to. {name}님</h2>
          <p className={classes.subtitle}>
            {posts.length
              ? `총 ${posts.length}명에게 축하를 받았어요!`
              : `아직 아무도 작성하지 않았어요!`}
          </p>
        </div>
        {/* TODO: 주인공 페이지에서 공유하기 버튼 임시 삭제 */}
        {/* <button className={classes.buttonSmall}>공유하기</button> */}
      </Header>
      <div className={classes.cardWrapper} ref={componentRef}>
        {cardList.length ? (
          <Cards content={cardList} linked />
        ) : (
          <div>더미</div>
        )}
      </div>
      <div
        className={classes.boxWrapper}
        onClick={() => exportComponentAsPNG(componentRef)}
      >
        <Buttons content="이미지 다운받기" full />
      </div>
    </Layouts>
  );
};

Main.getInitialProps = async (context) => {
  const name = context.query.name;
  const num = context.query.num;
  const res = await rollingService.getRollingByName(name, num);

  return {
    posts: res.data,
    name: name,
    num: num
  };
};

export default Main;
