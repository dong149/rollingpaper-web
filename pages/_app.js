import React from 'react';
import App, { Container as NextContainer } from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import '../styles/styles.scss';

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
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            {/* <Container maxWidth="sm"> */}
            <Component {...pageProps} />
            {/* </Container> */}
          </CssBaseline>
        </ThemeProvider>
      </>
    );
  }
}
