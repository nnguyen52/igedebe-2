import React from 'react';
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
const GameDetails = ({ gameWithDetails }) => {
  if (!gameWithDetails[0]) return <></>;
  return (
    <>
      <div className="gameDetail_container">
        <div className="cover_page">
          {
            <Image
              src={
                gameWithDetails[0].screenshots
                  ? `https://images.igdb.com/igdb/image/upload/t_1080p/${gameWithDetails[0].screenshots[0].image_id}.jpg`
                  : gameWithDetails[0].artworks
                  ? `https://images.igdb.com/igdb/image/upload/t_1080p/${gameWithDetails[0].artworks[0].image_id}.jpg`
                  : gameWithDetails[0].videos
                  ? `http://img.youtube.com/vi/${gameWithDetails[0].videos[0].video_id}/hqdefault.jpg`
                  : gameWithDetails[0].cover
                  ? `https://images.igdb.com/igdb/image/upload/t_1080p/${gameWithDetails[0].cover.image_id}.jpg`
                  : `https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpapercave.com%2Fwp%2FnTwzv3B.jpg&f=1&nofb=1`
              }
              alt="background cover"
              layout="fill"
            />
          }
        </div>
        <div className="cover_page_content">
          <div className="cover_page_content_name_and_companies">
            <h1 className="cover_page_content_name">{gameWithDetails[0].name}</h1>
            {gameWithDetails[0].first_release_date && (
              <h3 className="cover_page_content_release_date">
                <small>{dateFormat(gameWithDetails[0].first_release_date)}</small>
              </h3>
            )}
            <h3 className="cover_page_content_involved_companies">
              {gameWithDetails[0].involved_companies
                ? gameWithDetails[0].involved_companies.filter((company) => company.developer)
                    .length > 0
                  ? gameWithDetails[0].involved_companies.filter((company) => company.developer)[0]
                      .company.name
                  : 'TBD'
                : 'TBD'}
            </h3>
          </div>
          <div className="card mb-3 card_cover_details">
            <div className="row g-0">
              <div className="col-md-4">
                <Image
                  className="img-fluid rounded-start"
                  src={`https://images.igdb.com/igdb/image/upload/t_1080p/${gameWithDetails[0].cover.image_id}.jpg`}
                  alt=""
                  width={1920}
                  height={2048}
                  objectFit="contain"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  {gameWithDetails[0].summary && (
                    <>
                      <p>
                        <span className="card_cover_details_big_letter">
                          {gameWithDetails[0].summary.charAt(0)}
                        </span>
                        {gameWithDetails[0].summary.substring(1)}
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
                progress={Math.floor(gameWithDetails[0].total_rating)}
                radius={90}
                strokeWidth={10}
                trackStrokeWidth={15}
                strokeColor={
                  colorRating(gameWithDetails[0].total_rating) === 'No rating'
                    ? 'grey'
                    : colorRating(gameWithDetails[0].total_rating)
                }
              />
            </div>
            <div className="rating">
              {gameWithDetails[0].total_rating ? (
                <span style={{ color: colorRating(gameWithDetails[0].total_rating) }}>
                  {Math.round(gameWithDetails[0].total_rating)}
                </span>
              ) : (
                <span>NA</span>
              )}
              <ScoreRating
                className="score_rating"
                number={
                  gameWithDetails[0].total_rating ? gameWithDetails[0].total_rating : undefined
                }
              />
            </div>
            <div className="rating_src">Total rating</div>
          </div>
          <div className="cover_page_content_rating">
            <div className="progress_bar">
              <ProgressBar
                progress={gameWithDetails[0]?.rating ? gameWithDetails[0].rating : 100}
                radius={75}
                strokeWidth={10}
                trackStrokeWidth={15}
                strokeColor={
                  colorRating(gameWithDetails[0].rating) === 'No rating'
                    ? 'grey'
                    : colorRating(gameWithDetails[0].rating)
                }
              />
            </div>
            <div className="rating">
              {gameWithDetails[0].rating ? (
                <span style={{ color: colorRating(gameWithDetails[0].rating) }}>
                  {Math.round(gameWithDetails[0].rating)}
                </span>
              ) : (
                <span>NA</span>
              )}
              <ScoreRating
                className="score_rating"
                number={gameWithDetails[0].rating ? gameWithDetails[0].rating : undefined}
              />
            </div>
            <div className="rating_src">IGDB only</div>
          </div>
          {gameWithDetails[0].websites && (
            <div className="cover_page_content_websites">
              <h5>Social media</h5>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {gameWithDetails[0].websites.map((web, index) => {
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
      {(gameWithDetails[0].screenshots ||
        gameWithDetails[0].videos ||
        gameWithDetails[0].artworks) && (
        <Gallery
          screenshots={gameWithDetails[0].screenshots}
          videos={gameWithDetails[0].videos}
          artworks={gameWithDetails[0].artworks}
        />
      )}
      {/* {gameWithDetails[0] && (
        <div>
          <pre
            style={{ color: 'white', background: 'black' }}
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(gameWithDetails[0], null, 2),
            }}
          />
        </div>
      )} */}
      <CustomBreak />
      <AdditionalDetails game={gameWithDetails[0]} />
    </>
  );
};
export async function getStaticProps({ params }) {
  const res = await axios.post(`${apiURL}/api/getGamesDetails/${params.id}`);
  return {
    props: {
      gameWithDetails: res.data.data || [],
    },
    revalidate: 1, //refresh detailed game every 1/4 day
  };
}
export async function getStaticPaths() {
  const res = await axios.get(`${apiURL}/api/getPre500games`);
  const paths = res.data.filtered.map((game) => ({
    params: { id: game.id.toString() },
  }));
  return { paths, fallback: 'blocking' };
}
GameDetails.getLayout = (page) => renderLayout(page, '');
export default GameDetails;
