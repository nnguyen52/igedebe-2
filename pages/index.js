import Head from 'next/head';
import Page from '../component/Page';
import axios from 'axios';
import { apiURL } from '../utils/constants';
export default function Home({ justReleasedGames, comingSoonGames, mostAnticipatedGames }) {
  return (
    <div>
      <Head>
        <title>Igedebe</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
          rel="stylesheet"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.3.0/lightgallery.es5.min.js"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        /> */}
      </Head>
      <Page
        justReleasedGames={justReleasedGames}
        comingSoonGames={comingSoonGames}
        mostAnticipatedGames={mostAnticipatedGames}
      />
    </div>
  );
}
export async function getStaticProps() {
  try {
    const justReleasedGames = await axios.post(`${apiURL}/api/justReleasedGames`);
    const comingSoonGames = await axios.post(`${apiURL}/api/comingSoonGames`);
    const mostAnticipatedGames = await axios.post(`${apiURL}/api/mostAnticipatedGames`);
    return {
      props: {
        justReleasedGames: justReleasedGames.data.data || [],
        comingSoonGames: comingSoonGames.data.filtered || [],
        mostAnticipatedGames: mostAnticipatedGames.data.filtered || [],
      },
      revalidate: (60 * 60 * 1000) / 2, //half day
    };
  } catch (err) {
    console.log('__ERROR_GETSTATIC_PROP_', err.message);
  }
}
