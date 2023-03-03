import { type NextPage } from "next";
import Head from "next/head";
import { FächerTimeLine } from "~/components/fächer/FächerTimeline";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const fächer = api.db.kw.useQuery({ gruppe: 40, kw: 10 });
  

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Stunden</h1>
          {fächer.data ? <FächerTimeLine data={fächer.data.result} /> : <p>Loading tRPC query...</p>}
      </main>
    </>
  );

};

export default Home;
