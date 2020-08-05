import React from 'react';
import App, { Container as NextContainer } from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import '../styles/styles.scss';
import Head from 'next/head';

export default class RootApp extends App {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    const theme = createMuiTheme({
      palette: {
        background: {
          default: '#FFF',
        },
        primary: {
          main: '#673ab7',
        },
      },
    });
    return (
      <React.Fragment>
        <Head>
          <title>롤링 페이퍼 :: 특별한 온라인 선물</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1 ,user-scalable=no, maximum-scale=1"
          />
          <meta name="description" content="롤링 페이퍼 쉽게 만들기" />
          <meta
            name="keywords"
            content="롤링페이퍼,선물,생일,여자친구,100일,친구"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            {/* <Container maxWidth="sm"> */}
            <Component {...pageProps} />
            {/* </Container> */}
          </CssBaseline>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
