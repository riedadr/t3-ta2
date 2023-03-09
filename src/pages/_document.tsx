import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const getInitialProps = createGetInitialProps();

export default class NextDocument extends Document {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    static getInitialProps = getInitialProps;

    render() {
        return (
            <Html>
                <Head>
                    <meta name="application-name" content="Stundenplan" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="default"
                    />
                    <meta
                        name="apple-mobile-web-app-title"
                        content="Stundenplan"
                    />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="msapplication-TileColor" content="#008dc9" />
                    <meta name="msapplication-tap-highlight" content="no" />
                    <meta name="theme-color" content="#1a1b1e" />
                    <link
                        rel="apple-touch-icon"
                        href="/icons/icon-192x192.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="192x192"
                        href="/icons/icon-192x192.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="512x512"
                        href="/icons/icon-512x512.png"
                    />
                    <link rel="manifest" href="/app.webmanifest" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
