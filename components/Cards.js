import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import rollingService from '../services/rollingService';
import { motion } from 'framer-motion';
import { isEmpty } from '../functions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(100% + 32px)',
    minHeight: 'calc(100vh - 150px)',
    marginLeft: '-16px',
    padding: '25px 0 169px',
    overflow: 'hidden',
    background: '#fff',
    borderTopLeftRadius: '28px',
    borderTopRightRadius: '28px',
  },
  card: {
    display: '-webkit-box',
    overflow: 'hidden',
    display: 'flex',
    width: '130px',
    height: '142px',
    // background: (props) => props.bgColor,
    padding: '10px',
    borderRadius: '13px',
    lineHeight: '1.5em',
    alignItems: 'center',
    wordBreak: 'break-all',
    textOverflow: 'ellipsis',
    lineClamp: 6,
    boxOrient: 'vertical',
    textDecoration: 'none',
    // backgroundImage: `url('/images/bg_card.png')`,
    backgroundSize: 'cover',
    // backgroundBlendMode: 'color-burn',
    backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center center',
    // backgroundBlendMode: 'multiply',
  },
  cardInner: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    fontSize: '11px',
    textOverflow: 'ellipsis',
  },
}));

const styledRandom = (i, bgColor, bgImage) => {
  // TODO: 좀 더 자연스러운 랜덤 화면 구현
  let hashKey = (13 / (i + 1) + 0.2) % 1;
  let x = Math.floor(hashKey * 40);
  let y = Math.floor(hashKey * 40);
  let rotate = Math.floor(hashKey * (i % 2 === 0 ? 30 : -30));
  console.log(bgImage);
  return {
    transform:
      'rotate(' +
      rotate +
      'deg)' +
      ' translateX(' +
      x +
      'px)' +
      ' translateY(' +
      y +
      'px)',
    backgroundColor: `${bgColor}`,
    // backgroundColor: `${isEmpty(bgImage) ? bgColor : '#FFFFFF'}`,
    backgroundImage: `${
      isEmpty(bgImage) ? `url('/images/bg_card.png')` : `url('${bgImage}')`
    }`,
    backgroundSize: `${!isEmpty(bgImage) && 'cover '}`,
    backgroundBlendMode: `${isEmpty(bgImage) && 'color-burn'}`,
  };
};
const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
  when: 'afterChildren',
};
const Cards = (props) => {
  const classes = useStyles();
  const { name, num, content, linked, setIsPostsUpdated } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {content.map((value, i) => {
          console.log(value);
          return (
            <Grid item xs={4} key={value.id}>
              <motion.div
                transition={{ ...spring, delay: i * 0.2 }}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {linked ? (
                  <Link
                    href={{
                      pathname: '/receiver/detail',
                      query: { name: name, num: num, index: i },
                    }}
                  >
                    <a
                      elevation={0}
                      className={classes.card}
                      style={styledRandom(
                        i,
                        value.backgroundColor,
                        value.backgroundImage
                      )}
                    >
                      <p
                        className={classes.cardInner}
                        style={{
                          color: value.color,
                          fontFamily: value.font,
                          justifyContent: value.sort,
                        }}
                        dangerouslySetInnerHTML={{ __html: value.content }}
                      ></p>
                    </a>
                  </Link>
                ) : (
                  <Link
                    href={{
                      pathname: '/sender/detail',
                      query: { name: name, num: num, index: i },
                    }}
                  >
                    <a
                      elevation={0}
                      className={classes.card}
                      style={styledRandom(
                        i,
                        value.backgroundColor,
                        value.backgroundImage
                      )}
                    >
                      <p
                        className={classes.cardInner}
                        style={{
                          color: value.color,
                          fontFamily: value.font,
                          justifyContent: value.sort,
                        }}
                        dangerouslySetInnerHTML={{ __html: value.content }}
                      ></p>
                    </a>
                  </Link>
                )}
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const deletePost = async (rolling_id) => {
  console.log(rolling_id);

  try {
    await rollingService.deleteRollingContent(rolling_id);
    return 200;
  } catch (error) {
    return 400;
  }
};

export default Cards;
