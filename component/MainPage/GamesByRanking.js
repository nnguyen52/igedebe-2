import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { dateFormat } from '../../utils/dateFormat';
import Link from 'next/link';
import CustomButton from '../customButton';
import Image from 'next/image';
dayjs.extend(relativeTime);
const GamesByRanking = ({ games, type }) => {
  const [typeTitle, setTypeTitle] = useState(undefined);

  useEffect(() => {
    if (!type) return;
    setTypeTitle(
      type === 1 ? 'Recently Released' : type === 2 ? 'Coming Soon' : 'Most Anticipated'
    );
  }, [type]);
  return (
    <div className="root_container">
      <div className="type">
        <CustomButton
          content={typeTitle}
          routing={
            type === 1
              ? '/games/latest/0'
              : type === 2
              ? '/games/comingSoon/0'
              : '/games/mostAnticipated/0'
          }
          contentSize="1.5rem"
        />
      </div>
      {games.map((game) => {
        return (
          <div key={game.id}>
            <Link href={`/games/${game.id}`} style={{}}>
              <a>
                <div className="container row">
                  <div className="col-3">
                    <Image
                      src={
                        game.cover
                          ? `https://images.igdb.com/igdb/image/upload/t_cover_small/${game.cover.image_id}.jpg`
                          : ``
                      }
                      alt="cover img"
                      width={90}
                      height={128}
                    />
                  </div>
                  <div className="col-9">
                    <h4 className="gameTitle">{game.name}</h4>
                    {game.first_release_date && (
                      <h4 className="game_date">{dateFormat(game.first_release_date)}</h4>
                    )}
                  </div>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default GamesByRanking;
