import React from 'react';
import { dateFormat } from '../../utils/dateFormat';

const printGameDetailNameBased = (input, title, otherType) => {
  return (
    <div>
      <h5>{title}</h5>
      <div className="sub_content">
        {input.map((each, index) => {
          return (
            <span key={index} className="details">
              {!otherType && (
                <>
                  {`+ ${each.name}`} <br />
                </>
              )}
              {otherType && each !== undefined && (
                <>
                  {`+ ${each.description}`} <br />
                </>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};
const SideContent = ({ game }) => {
  if (!game) return;
  return (
    <div className="side_content">
      <h4>Information</h4>
      <div>
        {game.release_dates && (
          <>
            <h5>Release dates</h5>
            <div className="sub_content">
              {game.release_dates.map((each, index) => {
                return (
                  <div key={index} className="details">
                    {`+ ${dateFormat(each.date)}: ${each.platform ? each.platform.name : 'TBD'}`}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      {game.involved_companies &&
        game.involved_companies.filter((each) => each.developer).length > 0 && (
          <>
            <h5>Developer</h5>
            <div className="sub_content">
              {game.involved_companies
                .filter((each) => each.developer)
                .map((each, index) => {
                  return (
                    <div className="details" key={index}>
                      {`+ ${each.company.name}`}
                    </div>
                  );
                })}
            </div>
          </>
        )}

      {game.involved_companies && (
        <div>
          <h5>Publishers</h5>
          <div className="sub_content">
            {game.involved_companies.filter((each) => each.publisher)
              ? game.involved_companies
                  .filter((each) => each.publisher)
                  .map((each, index) => {
                    return (
                      <span key={index} className="details">
                        {`+ ${each.company.name}`} <br />
                      </span>
                    );
                  })
              : 'TBD'}
          </div>
        </div>
      )}
      {game.involved_companies && (
        <div>
          <h5>Supporting Developers</h5>
          <div className="sub_content">
            {game.involved_companies.filter((each) => each.supporting)
              ? game.involved_companies
                  .filter((each) => each.supporting)
                  .map((each, index) => {
                    return (
                      <span key={index} className="details">
                        {`+ ${each.company.name}`} <br />
                      </span>
                    );
                  })
              : 'TBD'}
          </div>
        </div>
      )}
      {game.genres && printGameDetailNameBased(game.genres, 'Genres')}
      {game.game_modes && printGameDetailNameBased(game.game_modes, 'Game modes')}
      {game.themes && printGameDetailNameBased(game.themes, 'Themes')}
      {game.player_perspectives &&
        printGameDetailNameBased(game.player_perspectives, 'Player perspectives')}
      {game.alternative_names &&
        printGameDetailNameBased(game.alternative_names, 'Alternative names')}
      {game.age_ratings &&
        game.age_ratings.filter((each) => each.content_descriptions).length > 0 &&
        printGameDetailNameBased(
          game.age_ratings.map((each) => each.content_descriptions).flat(),
          'Ratings',
          true
        )}
    </div>
  );
};

export default SideContent;
