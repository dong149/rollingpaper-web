import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Buttons from '../../components/Buttons';
import Slider from 'react-slick';
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
  },
  card: {
    width: '317px',
    height: '426px',
    background: '#FDFEB8',
    border: '1px solid #666',
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
    alignItems: 'center',
    marginTop: '43px',
    marginBottom: '50px',
  },
  headerTitle: {
    fontSize: '26px',
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
  const currentIndex = router.query.index ?? 1;
  const [sliderIndex, setSliderIndex] = useState(currentIndex);
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
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
    <Container component="main" maxWidth="xs" className={classes.root}>
      <header className={classes.header}>
        <a className={classes.headerIcon}>뒤로가기</a>
        <div className={classes.headerTitle}>
          <strong>{sliderIndex}</strong> / {cardList.length}
        </div>
        <button className={classes.headerIcon}>다운받기</button>
      </header>
      <Slider {...settings} ref={customeSlider}>
        {cardList.map((value, i) => (
          <div className={classes.card} key={i}>
            {value} {i}
          </div>
        ))}
      </Slider>
      <div className={classes.sender}>
        from. <b>지현</b>
      </div>
      <div className={classes.boxWrapper}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Buttons content="이전장" full light onClick={(e) => gotoPrev(e)} />
          </Grid>
          <Grid item xs={6}>
            <Buttons content="다음장" full onClick={(e) => gotoNext(e)} />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Detail;
