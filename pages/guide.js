import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
// import Cards from "../components/Cards"
import Buttons from '../components/Buttons';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  table: {
    width: '100%',
    '& th, & td': {
      textAlign: 'left',
      borderBottom: '1px solid #ccc',
    },
  },
}));

const Guide = () => {
  const classes = useStyles();
  return (
    <>
      {/* <Cards/> */}
      <Typography variant="h3" gutterBottom>
        Common Guide
      </Typography>
      <Typography variant="h4" gutterBottom>
        Button
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>content</td>
              <td>string</td>
              <td>내용</td>
            </tr>
            <tr>
              <td>light</td>
              <td>bool</td>
              <td>true면 흰색 테마</td>
            </tr>
            <tr>
              <td>full</td>
              <td>bool</td>
              <td>true면 width 100%</td>
            </tr>
          </tbody>
        </table>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Buttons content="이전장" full light />
        </Grid>
        <Grid item xs={6}>
          <Buttons content="다음장" full />
        </Grid>
      </Grid>
      <Buttons content="이미지 다운받기" full />
    </>
  );
};

export default Guide;
