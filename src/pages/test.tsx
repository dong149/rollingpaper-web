// 이미지 업로드 테스트를 위함입니다.
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
});
const Test = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [img, setImage] = useState(null);
  const onChange = (e) => {
    setImage(e.target.files[0]);
    var file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedFile([reader.result]);
    };
  };
  const onClick = async () => {
    const formData = new FormData();
    formData.append('file', img);
    // 서버의 upload API 호출
    const res = await axios.post('/api/upload', formData);
    console.log(res);
  };

  return (
    <div>
      <input
        // accept="image/*"
        // className={classes.input}
        id='contained-button-file'
        multiple
        type='img'
        onChange={ onChange }
      />
      <label htmlFor='contained-button-file'>dkdkdkdk</label>
      <img src={ selectedFile } />
    </div>
  );
};

export default Test;
