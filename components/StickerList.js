import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import rollingService from '../services/rollingService';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((props) => ({
  sticker: {
    display: 'inline-block',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '83px',
    height: '83px',
    zIndex: 10,
    cursor: 'pointer',
    '& img': {
      width: '83px',
      height: '83px',
    },
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
    border: (props) => !props.isReceiverPage && '2px solid #E53935',
    '& img': {
      width: '85px',
      height: '85px',
    },
  },
  stickerButton: {
    position: 'absolute',
    right: '-18px',
    top: '-18px',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#E53935',
    '& img': {
      width: '24px',
      height: '24px',
    },
  },
}));

const StickerList = (props) => {
  const [stickerList, setStickerList] = useState([]);
  const {
    rollingId,
    isStickerUpdated,
    setIsStickerUpdated,
    isReceiverPage,
  } = props;
  const classes = useStyles(props);

  const getStickers = async () => {
    await rollingService.getRollingSticker(rollingId).then((res) => {
      setStickerList(res.data);
    });
  };
  useEffect(() => {
    if (isStickerUpdated) {
      getStickers();
      setIsStickerUpdated(false);
    }
  }, [isStickerUpdated]);
  const deleteSticker = async (sticker_id) => {
    try {
      await rollingService.deleteRollingSticker(sticker_id);
      return 200;
    } catch (error) {
      return 400;
    }
  };
  return (
    <>
      {stickerList &&
        stickerList.map((sticker) => {
          return (
            <span
              key={sticker.id}
              className={classes.sticker}
              style={{
                transform: `translate(${sticker.x}px, ${sticker.y}px)`,
              }}
            >
              {!isReceiverPage && (
                <button
                  className={classes.stickerButton}
                  onClick={(e) => {
                    e.preventDefault();
                    deleteSticker(sticker.id).then((res) => {
                      setIsStickerUpdated(true);
                    });
                  }}
                >
                  <img src="/icons/icon-delete.png" />
                </button>
              )}
              <span className={classes.stickerImage}>
                <img src={sticker.url} />
              </span>
            </span>
          );
        })}
    </>
  );
};

export default StickerList;
