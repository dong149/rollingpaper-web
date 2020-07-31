import Document, { Head, Main, NextScript } from "next/document";

export default class RootDocument extends Document {
  render() {
    return (
      <html lang="ko">
        <Head>
          <Head>
            {/* <link
            rel="preload"
            href="/fonts/NanumPenScript-Regular.ttf"
            as="font"
            crossOrigin=""
          /> */}
          </Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-173127717-1"
          ></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'UA-173127717-1');
                  `,
            }}
          ></script>

          <meta charSet="UTF-8" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/icons/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/icons/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/icons/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/icons/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/icons/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/icons/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/icons/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/icons/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/icons/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="canonical" href="https://rollingpaper.site/" />
          <meta property="og:title" content="롤링 페이퍼 만들기" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/images/pen.jpeg" />
          <meta property="og:url" content="https://rollingpaper.site" />
          <meta property="site_title" content="롤링 페이퍼 만들기" />

          {/* <script
            async
            crossOrigin="true"
            type="text/javascript"
            src="https://developers.kakao.com/sdk/js/kakao.js"
          ></script> */}
          <script type="text/javascript" src="/static/kakao.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
