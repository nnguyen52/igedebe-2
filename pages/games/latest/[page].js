import React, { useEffect, useState } from 'react';
import { useJustReleaseGamesPagination } from '../../../useRequests';
import Masonry from 'react-masonry-css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { dateFormat } from '../../../utils/dateFormat';
import Link from 'next/link';
import { pictureFormat } from '../../../utils/pictureFormat';
import LoadingPage from '../../../component/LoadingPage';
import { useRouter } from 'next/router';
import { rangeArr } from '../../../utils/generateArrNum';
import Image from 'next/image';
import axios from 'axios';
import { apiURL } from '../../../utils/constants';
const LatestGames = ({ initGames = [], p }) => {
  const router = useRouter();
  const [data, setData] = useState(initGames);
  const [isSwr, setIsSWR] = useState(false);

  const masonryBreakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  const { games, error, isLoading, setPage, page } = useJustReleaseGamesPagination(p);

  useEffect(() => {
    if (games === data) return;
    setIsSWR(true);
    if (games !== data) {
      setTimeout(() => {
        setData(games);
        return setIsSWR(true);
      }, 0);
    }
  }, [games, isSwr, data]);

  useEffect(() => {
    if (!router.query.page) return;
    if (!parseFloat(router.query.page)) return router.replace(`/games/latest/0`);
  }, [router.query.page]);

  const nextPage = () => {
    router.replace(`/games/latest/${parseFloat(page) + 10}`);
    setPage(parseFloat(page) + 10);
  };

  const backPage = () => {
    if (page === 0) return;
    router.replace(`/games/latest/${parseFloat(page) - 10}`);
    setPage(parseFloat(page) - 10);
  };

  if (!error && games.length === 0 && !isLoading) {
    setPage(0);
    router.replace(`/games/latest/0`);
  }
  if (isSwr && error) return <h2>server error...</h2>;
  if ((isSwr && isLoading) || !data)
    return (
      <>
        <LoadingPage />
      </>
    );

  return (
    <div className="detail_games_by_ranking_container">
      <Masonry
        breakpointCols={masonryBreakpointColumns}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data.map((game, index) => {
          return (
            <div key={index} className="item">
              <Link href={`/games/${game.id}`}>
                <a>
                  <div>
                    {game.cover && (
                      <Image
                        src={pictureFormat(game.cover.image_id, `720p`)}
                        alt="img"
                        width={500}
                        height={720}
                      />
                    )}
                    {!game.cover && (
                      <Image
                        alt="img"
                        src={`https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe8%2F27%2Faf%2Fe827af6fc27e84d4fce3636179f27c99.png&f=1&nofb=1`}
                        width={500}
                        height={720}
                      />
                    )}
                  </div>
                  <div className="content">
                    {game.name ? game.name : 'TBD'} <br />
                    {game.first_release_date
                      ? dateFormat(game.first_release_date)
                      : 'Release Date currently unava3ilable'}
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </Masonry>

      {parseFloat(page) >= 10 && (
        <FontAwesomeIcon icon={faAngleLeft} className="btn btn_back" onClick={() => backPage()} />
      )}

      {data && data.length >= 10 && (
        <FontAwesomeIcon
          icon={faAngleRight}
          className="btn btn_next"
          onClick={() => (data && data.length >= 10 ? nextPage() : null)}
        />
      )}
    </div>
  );
};

export default LatestGames;

export async function getStaticProps({ params }) {
  const initGames = await axios.get(`${apiURL}/api/getJustReleasedGamesPagination/${params.page}`);
  return {
    props: {
      initGames: initGames.data || [],
      p: params.page || 0,
    },
    revalidate: 60 * 60 * 1000,
  };
}
export async function getStaticPaths() {
  const arrNum = rangeArr(0, 100, 10);
  const paths = arrNum.map((p) => ({ params: { page: `${p}` } }));
  return { paths, fallback: 'blocking' };
}
