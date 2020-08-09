import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import rollingService from '../services/rollingService';
import DeleteModal from './DeleteModal';

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
    display: 'block',
    width: '123px',
    height: '169px',
    // background: (props) => props.bgColor,
    border: '1px solid #666',
  },
}));

const styledRandom = (i, font, sort, color, bgColor) => {
  // TODO: 좀 더 자연스러운 랜덤 화면 구현
  let hashKey = (13 / (i + 1) + 0.2) % 1;
  let x = Math.floor(hashKey * 40);
  let y = Math.floor(hashKey * 40);
  let rotate = Math.floor(hashKey * (i % 2 === 0 ? 30 : -30));
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
    border: 0,
    borderRadius: '20px',
    padding: '10px',
    color: `${color}`,
    fontFamily: `${font}`,
    textAlign: `${sort}`,
  };
};

const Cards = (props) => {
  const classes = useStyles();
  const { content, linked } = props;
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  return (
    <div className={classes.root}>
      <DeleteModal
        deleteModalIsOpen={deleteModalIsOpen}
        setDeleteModalIsOpen={setDeleteModalIsOpen}
      />
      <Grid container spacing={2}>
        {content.map((value, i) => {
          return (
            <Grid
              item
              xs={4}
              key={i}
              onClick={() => {
                setDeleteModalIsOpen(true);
                // deletePost(value.id);
              }}
            >
              {linked ? (
                <Link
                  href={{ pathname: '/receiver/detail', query: { index: i } }}
                >
                  <a
                    elevation={0}
                    className={classes.card}
                    style={styledRandom(i)}
                  >
                    카드 {i + 1}
                  </a>
                </Link>
              ) : (
                <div
                  elevation={0}
                  className={classes.card}
                  style={styledRandom(
                    i,
                    value.font,
                    value.sort,
                    value.color,
                    value.backgroundColor
                  )}
                >
                  {value.content}
                </div>
              )}
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
    const res = await rollingService.deleteRollingContent(rolling_id);
    return res;
  } catch (error) {
    alert(error.message);
  }
};

export default Cards;
