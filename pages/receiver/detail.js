import React, { useState, useRef } from 'react';
import Layouts from '../../components/Layouts';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Buttons from '../../components/Buttons';
import Slider from 'react-slick';
import Header from '../../components/Header';
import StickyFooter from '../../components/StickyFooter';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const cardList = Array(10).fill('카드'); // 임시 배열

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    flexDirection: 'column',
    background: '#FFF',
  }, // TODO: 나중에 상황 보고 공통화 및 일괄 삭제
  card: {
    overflow: 'hidden',
    width: '317px',
    height: '426px',
    background: '#E8E6DC',
    borderRadius: '13px',
  },
  title: {
    fontSize: '26px',
  },
  iconBack: {},
  iconSave: {},
  slider: {
    width: 'calc(100% + 32px)',
    marginTop: '75px',
    marginLeft: '-16px',
    alignSelf: 'normal',
  },
  sender: {
    marginTop: '27px',
    textAlign: 'right',
    fontSize: '24px',
  },
  cardCenter: {
    textAlign: 'center',
  },
}));

const Detail = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const customeSlider = useRef();
  const currentIndex = Number(router.query.index ?? 0);
  const [sliderIndex, setSliderIndex] = useState(currentIndex + 1);
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '30px',
    slidesToShow: 1,
    speed: 500,
    arrows: false,
    initialSlide: currentIndex,
    beforeChange: (current, next) => {
      setSliderIndex(next + 1);
    },
  };
  const gotoNext = (e) => {
    e.preventDefault();
    customeSlider.current.slickNext();
  };
  const gotoPrev = (e) => {
    e.preventDefault();
    customeSlider.current.slickPrev();
  };
  return (
    <Layouts className={classes.root}>
      <Header>
        <a className={classes.iconBack}>뒤로가기</a>
        <div className={classes.title}>
          <strong>{sliderIndex}</strong> / {cardList.length}
        </div>
        <button className={classes.iconSave}>다운받기</button>
      </Header>
      <Slider {...settings} ref={customeSlider} className={classes.slider}>
        {cardList.map((value, i) => (
          <div className={classes.card} key={i}>
            {value} {i}
          </div>
        ))}
      </Slider>
      <div className={classes.sender}>
        from. <b>지현</b>
      </div>
      <StickyFooter>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Buttons full light onClick={(e) => gotoPrev(e)}>
              이전장
            </Buttons>
          </Grid>
          <Grid item xs={6}>
            <Buttons full onClick={(e) => gotoNext(e)}>
              다음장
            </Buttons>
          </Grid>
        </Grid>
      </StickyFooter>
    </Layouts>
  );
};

export default Detail;
