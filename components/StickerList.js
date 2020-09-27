import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import rollingService from '../services/rollingService';
import { Button } from '@material-ui/core';
import { motion } from 'framer-motion';

const useStyles = makeStyles((props) => ({
  sticker: {
    display: 'inline-block',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '110px',
    height: '110px',
    zIndex: 10,
    cursor: 'pointer',
    '& img': {
      width: '110px',
      height: '110px',
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
    '& img': {
      width: '110px',
      height: '110px',
    },
  },
  focusedSticker: {
    border: '2px solid #E53935',
  },
  stickerButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '-18px',
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
  const [isEditableKey, setIsEditableKey] = useState(null);
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
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsEditableKey(null);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
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
  const spring = {
    type: 'spring',
    damping: 20,
    stiffness: 100,
    when: 'afterChildren',
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <div ref={wrapperRef}>
      {stickerList &&
        stickerList.map((sticker, i) => {
          return (
            // <motion.div
            //   transition={{ ...spring }}
            //   initial={{ opacity: 0 }}
            //   animate={{ opacity: 1 }}
            // >
            // TODO: 하면 좋은데, Cards와 싱크가 안맞아 보류
            <span
              key={sticker.id}
              className={classes.sticker}
              style={{
                transform: `translate(${sticker.x}px, ${sticker.y}px)`,
              }}
              onClick={(e) =>
                isReceiverPage
                  ? e.preventDefault()
                  : setIsEditableKey(sticker.id)
              }
            >
              {isEditableKey === sticker.id && (
                <button
                  className={classes.stickerButton}
                  onClick={(e) => {
                    e.preventDefault();
                    deleteSticker(sticker.id).then((res) => {
                      setIsStickerUpdated(true);
                    });
                  }}
                >
                  <img src="/icons/icon-delete.png" alt="스티커 삭제하기" />
                </button>
              )}
              <span
                className={`${classes.stickerImage} ${isEditableKey === sticker.id && classes.focusedSticker
                  }`}
              >
                <img src={sticker.url} />
              </span>
            </span>
            // </motion.div>
          );
        })}
    </div>
  );
};

export default StickerList;
