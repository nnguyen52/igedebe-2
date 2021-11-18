import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import ProgressBar from 'react-customizable-progressbar';
import axios from 'axios';
import WebsiteEnums from '../../utils/websiteEnum';
import ScoreRating, { colorRating } from '../../utils/ScoreRating';
import Gallery from '../../component/Gallery';
import { dateFormat } from '../../utils/dateFormat';
import { renderLayout } from '../../Layouts/generateLayout';
import Image from 'next/image';
import AdditionalDetails from '../../component/GameDetails/AdditionalDetails';
import CustomBreak from '../../component/customBreak';
import { apiURL } from '../../utils/constants';
import no_cover_image from '../../assets/no_image_cover.png';
import { useRouter } from 'next/router';
import LoadingPage from '../../component/LoadingPage';

const GameDetails = ({ gameWithDetails }) => {
  const [game, setGame] = useState(gameWithDetails[0]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      // if (gameWithDetails[0] && gameWithDetails[0].id === router.query.id) return;
      if (gameWithDetails.length > 0) return setGame((prevState) => gameWithDetails[0]);
      const getDetailedGame = async (id) => {
        const res = await axios({ method: 'POST', url: `${apiURL}/api/getGamesDetails/${id}` });
        setGame(res.data.data[0]);
      };
      if (gameWithDetails.length === 0 || !gameWithDetails) {
        await getDetailedGame(router.query.id);
      }
    })();
  }, [router.query.id]);
  if (!game)
    return (
      <>
        <LoadingPage autoplay={false} loop={false} />
      </>
    );
  return (
    <>
      <div className="gameDetail_container">
        <div className="cover_page">
          {
            <Image
              src={
                game.screenshots
                  ? `https://images.igdb.com/igdb/image/upload/t_1080p/${game.screenshots[0].image_id}.jpg`
                  : game.artworks
                  ? `https://images.igdb.com/igdb/image/upload/t_1080p/${game.artworks[0].image_id}.jpg`
                  : game.videos
                  ? `http://img.youtube.com/vi/${game.videos[0].video_id}/hqdefault.jpg`
                  : game.cover
                  ? `https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.jpg`
                  : `https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpapercave.com%2Fwp%2FnTwzv3B.jpg&f=1&nofb=1`
              }
              alt="background cover"
              layout="fill"
            />
          }
        </div>
        <div className="cover_page_content">
          <div className="cover_page_content_name_and_companies">
            <h1 className="cover_page_content_name">{game.name}</h1>
            {game.first_release_date && (
              <h3 className="cover_page_content_release_date">
                <small>{dateFormat(game.first_release_date)}</small>
              </h3>
            )}
            <h3 className="cover_page_content_involved_companies">
              {game.involved_companies
                ? game.involved_companies.filter((company) => company.developer).length > 0
                  ? game.involved_companies.filter((company) => company.developer)[0].company.name
                  : 'TBD'
                : 'TBD'}
            </h3>
          </div>
          <div className="card mb-3 card_cover_details">
            <div className="row g-0">
              <div className="col-md-4">
                <Image
                  className="img-fluid rounded-start"
                  src={
                    game.cover
                      ? `https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.jpg`
                      : no_cover_image
                  }
                  alt=""
                  width={1920}
                  height={2048}
                  objectFit="contain"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  {game.summary && (
                    <>
                      <p>
                        <span className="card_cover_details_big_letter">
                          {game.summary.charAt(0)}
                        </span>
                        {game.summary.substring(1)}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="cover_page_content_total_rating">
            <div className="progress_bar" style={{ padding: 0 }}>
              <ProgressBar
                progress={Math.floor(game.total_rating)}
                radius={90}
                strokeWidth={10}
                trackStrokeWidth={15}
                strokeColor={
                  colorRating(game.total_rating) === 'No rating'
                    ? 'grey'
                    : colorRating(game.total_rating)
                }
              />
            </div>
            <div className="rating">
              {game.total_rating ? (
                <span style={{ color: colorRating(game.total_rating) }}>
                  {Math.round(game.total_rating)}
                </span>
              ) : (
                <span>NA</span>
              )}
              <ScoreRating
                className="score_rating"
                number={game.total_rating ? game.total_rating : undefined}
              />
            </div>
            <div className="rating_src">Total rating</div>
          </div>
          <div className="cover_page_content_rating">
            <div className="progress_bar">
              <ProgressBar
                progress={game?.rating ? game.rating : 100}
                radius={75}
                strokeWidth={10}
                trackStrokeWidth={15}
                strokeColor={
                  colorRating(game.rating) === 'No rating' ? 'grey' : colorRating(game.rating)
                }
              />
            </div>
            <div className="rating">
              {game.rating ? (
                <span style={{ color: colorRating(game.rating) }}>{Math.round(game.rating)}</span>
              ) : (
                <span>NA</span>
              )}
              <ScoreRating
                className="score_rating"
                number={game.rating ? game.rating : undefined}
              />
            </div>
            <div className="rating_src">IGDB only</div>
          </div>
          {game.websites && (
            <div className="cover_page_content_websites">
              <h5>Social media</h5>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {game.websites.map((web, index) => {
                  return (
                    <div key={index} className="website_icon">
                      <WebsiteEnums cate={web.category} url={web.url} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {(game.screenshots || game.videos || game.artworks) && (
        <Gallery screenshots={game.screenshots} videos={game.videos} artworks={game.artworks} />
      )}
      {/* {game && (
        <div>
          <pre
            style={{ color: 'white', background: 'black' }}
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(game, null, 2),
            }}
          />
        </div>
      )} */}
      <CustomBreak />
      <AdditionalDetails game={game} />
    </>
  );
};
export async function getStaticProps({ params }) {
  const res = await axios.post(`${apiURL}/api/getGamesDetails/${params.id}`);
  // make a placeholder
  let game = [];
  if (res.data.data) {
    game = res.data.data;
  }
  if (!res.data.data) console.log('_______ERROR______', res.config.url);
  return {
    props: {
      gameWithDetails: game,
    },
    revalidate: game.length > 0 ? (60 * 60 * 1000) / 4 : 1, //refresh detailed game every 1/4 day
  };
}
export async function getStaticPaths() {
  const res = await axios.get(`${apiURL}/api/getPre500games`);
  const paths = res.data.filtered.map((game, index) => ({
    params: { id: game.id.toString(), index },
  }));
  return { paths, fallback: 'blocking' };
}
GameDetails.getLayout = (page) => renderLayout(page, '');
export default GameDetails;
