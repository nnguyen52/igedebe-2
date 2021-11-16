import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const CardGame = ({ game }) => {
  return (
    <div className="card_game">
      <Link href={`/games/${game.id}`}>
        {game.cover ? (
          <a>
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
              alt="img cover"
              width={264}
              height={374}
              loading="lazy"
            />
          </a>
        ) : (
          <a>
            <Image
              src={`https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe8%2F27%2Faf%2Fe827af6fc27e84d4fce3636179f27c99.png&f=1&nofb=1`}
              alt="img cover"
              width={264}
              height={374}
            />
          </a>
        )}
      </Link>
    </div>
  );
};

export default CardGame;
