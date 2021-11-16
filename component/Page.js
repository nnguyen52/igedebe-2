import React, { useEffect, useState } from 'react';
import CardGame from './CardGame';
import Slider from 'react-slick';
import GamesByRanking from './MainPage/GamesByRanking';
import CustomBreak from './customBreak';
const Page = ({ justReleasedGames, comingSoonGames, mostAnticipatedGames }) => {
  const [windowWidth, setWindowWidth] = useState(undefined);

  // resize window
  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWindowWidth(window.innerWidth);
      }
      window.addEventListener('resize', handleResize);
      handleResize();
    }

    try {
      return () => window.removeEventListener('resize', window);
    } catch (err) {
      console.log(err);
    }
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: windowWidth ? (windowWidth > 768 ? 4 : 2) : 2,
    slidesToScroll: windowWidth ? (windowWidth > 768 ? 4 : 2) : 2,
    accessibility: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div>
      <div className="slider">
        <Slider {...settings}>
          {comingSoonGames &&
            comingSoonGames.map((game) => {
              return (
                <div key={game.id}>
                  <CardGame game={game} />
                </div>
              );
            })}
        </Slider>
      </div>
      <CustomBreak />
      <div className="game_by_ranking">
        <GamesByRanking type={1} games={justReleasedGames.slice(0, 10)} />
        <GamesByRanking type={2} games={comingSoonGames.slice(0, 10)} />
        <GamesByRanking type={3} games={mostAnticipatedGames.slice(0, 10)} />
      </div>
    </div>
  );
};

export default Page;
