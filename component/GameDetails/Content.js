import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import CardGame from '../CardGame';
import { useRouter } from 'next/router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CustomButton from '../customButton';
const Content = ({ game }) => {
  const router = useRouter();
  const [similar_games, setSimilarGames] = useState([]);
  const [readMore, setReadmore] = useState(false);
  useEffect(() => {
    if (!game) return;
    if (similar_games === game.similar_games) return;
    setSimilarGames(game.similar_games);
  }, [game, router.query.id]);
  var sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    accessibility: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  if (!game) return <></>;
  return (
    <div className="content_detail">
      <div className="quick_info" id="quick_info">
        <h4>Quick info</h4>
        {game.genres && (
          <>
            <h5>Genre</h5>
            {`+ ${JSON.stringify(game.genres.map((game) => game.name))
              .slice(1, -1)
              .split(',')
              .map((each) => each.slice(1, -1))
              .join(', ')}`}
          </>
        )}
        {game.platforms && (
          <>
            <h5>Platforms</h5>
            {`+ ${JSON.stringify(game.platforms.map((game) => game.name))
              .slice(1, -1)
              .split(',')
              .map((each) => each.slice(1, -1))
              .join(', ')}`}
          </>
        )}
        {game.involved_companies.filter((each) => each.developer).length > 0 && (
          <>
            <h5>Developer</h5>
            {game.involved_companies.filter((each) => each.developer).length == 0 ? (
              <>
                <h2>this game has no developer</h2>{' '}
              </>
            ) : (
              `${game.involved_companies.filter((each) => each.developer)[0].company.name}`
            )}
          </>
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
      </div>
      <div className="storyline">
        {game.storyline && (
          <>
            <h4 id="storyline">Storyline</h4>
            <span>
              {!readMore ? `${game.storyline.slice(0, 200)}...` : game.storyline}
              <span className="readmore" onClick={() => setReadmore(!readMore)}>
                {readMore ? ' Hide' : 'Read more'}
              </span>
            </span>
          </>
        )}
      </div>
      <div className="recommendations" id="recommendations">
        <h4>Recommendations</h4>
        {similar_games.length > 0 && (
          <>
            <div
              className="slider"
              style={{
                position: 'relative',
              }}
            >
              <Slider {...sliderSettings}>
                {similar_games &&
                  similar_games.map((game) => {
                    return (
                      <div key={game.id}>
                        <CardGame game={game} />
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Content;
