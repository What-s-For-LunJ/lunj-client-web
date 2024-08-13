import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Head>
        <title>LunJ</title>
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </main>
  );
}

