import React, { useRef, useState, useEffect } from 'react';
import Layouts from '../../components/Layouts';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/Header';
import StickyFooter from '../../components/StickyFooter';
import Cards from '../../components/Cards';
import Buttons from '../../components/Buttons';
import { exportComponentAsPNG } from '../../utils';
import rollingService from '../../api/rollingService';
import StickerList from '../../components/StickerList';

import Confetti from 'react-confetti';

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
    overflow: 'hidden',
    position: 'relative',
    marginTop: '14px',
    width: 'calc(100% + 32px)',
    minHeight: 'calc(100vh - 104px)',
    marginLeft: '-16px',
    background: '#FFF',
    borderTopLeftRadius: '28px',
    borderTopRightRadius: '28px',
  },
  title: {
    margin: '0',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: '5px',
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
  const [isStickerUpdated, setIsStickerUpdated] = useState(true);
  const [bodyWidth, setBodyWidth] = useState(0);
  const [bodyHeight, setBodyHeight] = useState(0);
  useEffect(() => {
    setBodyWidth(layoutRef.scrollWidth);
    setBodyHeight(layoutRef.current.scrollHeight);
  }, []);
  return (
    <div style={{ backgroundColor: '#F6F6F6' }} ref={layoutRef}>
      <Confetti
        width={bodyWidth}
        height={bodyHeight}
        numberOfPieces={100}
        colors={[
          '#f44336',
          '#e91e63',
          '#9c27b0',
          '#673ab7',
          '#3f51b5',
          '#2196f3',
          '#03a9f4',
          '#00bcd4',
          '#009688',
          '#4CAF50',
          '#8BC34A',
          '#CDDC39',
          '#FFEB3B',
          '#FFC107',
          '#FF9800',
          '#FF5722',
          '#795548',
        ]}
        opacity={0.4}
      />
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
          {posts.rollingpaperId && (
            <StickerList
              rollingId={posts.rollingpaperId}
              isStickerUpdated={isStickerUpdated}
              setIsStickerUpdated={setIsStickerUpdated}
              isReceiverPage={true}
            />
          )}
          {posts.contents.length ? (
            <Cards name={name} num={num} content={posts.contents} linked />
          ) : (
              <div
                style={{
                  minHeight: 'calc(100vh - 150px)',
                  textAlign: 'center',
                  paddingTop: '90px',
                }}
              >
                <img
                  style={{
                    width: '80%',
                  }}
                  src="/icons/empty.png"
                  alt="아무도 작성하지 않은 경우"
                />
              </div>
            )}
        </div>
        {/* <StickyFooter>
          <Buttons full onClick={() => exportComponentAsPNG(componentRef)}>
            <img
              src="/icons/download-light-icon.png"
              alt=""
              className={classes.icon}
            />
            전체화면 다운받기
          </Buttons>
        </StickyFooter> */}
      </Layouts>
    </div>
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
