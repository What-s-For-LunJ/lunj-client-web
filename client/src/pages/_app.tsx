import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "@/components/navbar";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <main>
      <Head>
        <title>Lunj</title>
        <meta name="description" content="What's for lunj?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Component key={router.route} {...pageProps} />
    </main>
  );
}

