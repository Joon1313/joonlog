import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="JoonLog" />
          <meta name="Keywords" content="JoonLog" />
          <meta name="author" content="Camon" />
          <link rel="icon" href="/favicon.ico" />

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-LQHP0K5JZH"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-LQHP0K5JZH');
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
