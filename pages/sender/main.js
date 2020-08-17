import React, { useState, useEffect } from 'react';
import Layouts from '../../components/Layouts';
import { makeStyles } from '@material-ui/core/styles';
import rollingService from '../../services/rollingService';
import Header from '../../components/Header';
import StickyFooter from '../../components/StickyFooter';
import StickerModal from '../../components/StickerModal';
import Cards from '../../components/Cards';
import Buttons from '../../components/Buttons';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import { isEmpty } from '../../functions';
import Draggable from 'react-draggable';
import StickerList from '../../components/StickerList';

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
    width: 'calc(100% + 32px)',
    marginLeft: '-16px',
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
  buttonSmall: {
    display: 'inline-block',
    minWidth: '87px',
    height: '35px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#000',
    border: '1px solid #000',
    borderRadius: '10px',
    background: 'transparent',
  },
  icon: {
    width: '24px',
    marginRight: '14px',
  },
  sticker: {
    position: 'absolute',
    left: '0',
    top: '0',
    zIndex: 10,
  },
  stickerImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '110px',
    height: '110px',
    border: '2px solid #000',
    '& img': {
      width: '85px',
      height: '85px',
    },
  },
  stickerButton: {
    width: '110px',
    height: '32px',
    marginTop: '8px',
    backgroundColor: '#000',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    cursor: 'pointer',
    zIndex: 100,
  },
  btnSquare: {
    flexBasis: '56px',
    flexShrink: 0,
    '& button': {
      width: '56px',
      height: '56px',
      marginTop: '7px',
      borderRadius: '10px',
      border: '1px solid #232323',
      background: '#fff',
      '& img': {
        width: '56px',
        height: '56px',
      },
    },
  },
  btnfull: {
    flexGrow: 1,
  },
}));
const Main = (props) => {
  const classes = useStyles();
  const { data, name, num } = props;
  console.log('name, num의 props 값 : ', data, name, num);
  const [posts, setPosts] = useState(data);
  const [isPostsUpdated, setIsPostsUpdated] = useState(false);
  const [activeDrags, setActiveDrags] = useState(0);
  const [stickerModalIsOpen, setStickerModalIsOpen] = useState(false);
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [stickerURL, setStickerURL] = useState(null);
  const [isStickerUpdated, setIsStickerUpdated] = useState(true);
  // useEffect(() => {
  //   const getPosts = async () => {
  //     await rollingService.getRollingByName(name, num).then((res) => {
  //       setPosts(res.data);
  //     });
  //   };
  //   if (isEmpty(data)) {
  //     getPosts();
  //   }
  //   setIsPostsUpdated(false);
  // }, [isPostsUpdated]);
  const handleDrag = (e, ui) => {
    e.preventDefault();
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
    setPosition({ x: Math.floor(ui.x), y: Math.floor(ui.y) });
  };
  const onStart = () => {
    setActiveDrags(1);
  };
  const onStop = () => {
    setActiveDrags(0);
  };
  const onCreateSticker = async () => {
    try {
      await rollingService
        .postRollingSticker(
          posts.rollingpaperId,
          position.x ?? 1,
          position.y ?? 1,
          stickerURL
        )
        .then((res) => {
          setIsStickerUpdated(true);
          setPosition({});
          setStickerURL(null);
        });
    } catch (err) {
      return 400;
    }
  };

  return (
    <div style={{ backgroundColor: '#F6F6F6' }}>
      <Layouts className={classes.root} bgColor="#F7F7F7">
        <StickerModal
          stickerModalIsOpen={stickerModalIsOpen}
          setStickerModalIsOpen={setStickerModalIsOpen}
          stickerURL={stickerURL}
          setStickerURL={setStickerURL}
        />
        <Header>
          <div>
            <h2 className={classes.title}>to. {name}님</h2>
            <p className={classes.subtitle}>
              {!isEmpty(posts)
                ? `총 ${posts.contents.length}명에게 축하를 받았어요!`
                : `아직 아무도 작성하지 않았어요!`}
            </p>
          </div>
          <Link
            href={{
              pathname: '/sender/share',
              query: { name: name, num: num, id: posts.rollingpaperId },
            }}
          >
            <button className={classes.buttonSmall}>공유하기</button>
          </Link>
        </Header>
        <div className={classes.cardWrapper}>
          {posts.rollingpaperId && (
            <StickerList
              rollingId={posts.rollingpaperId}
              isStickerUpdated={isStickerUpdated}
              setIsStickerUpdated={setIsStickerUpdated}
            />
          )}
          {stickerURL && (
            <Draggable
              bounds="parent"
              onStart={onStart}
              onDrag={handleDrag}
              onStop={onStop}
              style={{ position: 'absolute', bottom: '100px', right: '100px' }}
            >
              <div className={classes.sticker}>
                <span className={classes.stickerImage}>
                  <img src={stickerURL} />
                </span>
                {/* <button
                  className={classes.stickerButton}
                  onClick={() => onCreateSticker()}
                >
                  완료
                </button> */}
                {/* TODO: mobile에서는 버튼이 안먹는 이슈로 삭제 */}
              </div>
            </Draggable>
          )}
          {posts.contents.length ? (
            <Cards
              content={posts.contents}
              linked={false}
              setIsPostsUpdated={setIsPostsUpdated}
              name={name}
              num={num}
            />
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
        <StickyFooter>
          <Grid container spacing={2}>
            {stickerURL ? (
              <Buttons onClick={onCreateSticker} full>
                완료
              </Buttons>
            ) : (
              <>
                <Grid item className={classes.btnSquare}>
                  <button
                    variant="contained"
                    onClick={() => setStickerModalIsOpen(true)}
                  >
                    <img src="/icons/sticker-icon.png" alt="스티커 붙이기" />
                  </button>
                </Grid>
                <Grid item className={classes.btnfull}>
                  <Link
                    href={{
                      pathname: '/sender/editor',
                      query: { name: name, num: num, id: posts.rollingpaperId },
                    }}
                  >
                    <Buttons full={true}>
                      <img
                        src="/icons/write-light-icon.png"
                        alt=""
                        className={classes.icon}
                      />
                      롤링페이퍼 작성하기
                    </Buttons>
                  </Link>
                </Grid>
              </>
            )}
          </Grid>
        </StickyFooter>
      </Layouts>
    </div>
  );
};

Main.getInitialProps = async (context) => {
  const name = context.query.name;
  const num = context.query.num;
  const res = await rollingService.getRollingByName(name, num);

  return {
    data: res.data,
    name: name,
    num: num,
  };
};

export default Main;
