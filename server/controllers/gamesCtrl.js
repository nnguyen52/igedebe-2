const apiConfig = require('../apiConfig');
const filterDuplicatesByName_forGames = (data) => {
  const names = data.map((o) => o.name);
  const filtered = data.filter(({ name }, index) =>
    name ? !names.includes(name, index + 1) : name
  );
  return filtered;
};
const gamesCtrl = {
  getPre500games: async (req, res) => {
    try {
      const response = await apiConfig(
        '/games',
        `fields name, first_release_date , hypes; where hypes > 10 ; sort first_release_date desc ; limit 2;`
      );

      const filtered = filterDuplicatesByName_forGames(response.data);
      res.json({ msg: 'ok', filtered });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  },
  getJustReleasedGames: async (req, res) => {
    try {
      const response = await apiConfig(
        '/games',
        `fields id, name, first_release_date,  hypes, cover.image_id ; where hypes > 1 & first_release_date > ${Math.floor(
          Math.floor((Math.floor(new Date().getTime()) - 86400000 * 14) / 1000)
        )}  & first_release_date <= ${Math.floor(
          Math.floor(new Date().getTime()) / 1000
        )}; sort hypes desc; sort first_release_date desc; limit 200;`
      );
      const data = filterDuplicatesByName_forGames(response.data);
      res.json({ msg: 'ok', data });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  },
  comingSoonGames: async (req, res) => {
    try {
      const response = await apiConfig(
        '/games',
        `fields name , cover.image_id, screenshots.image_id , videos.video_id , first_release_date , hypes; where hypes > 30 & first_release_date > ${Math.floor(
          Math.floor(Date.now() / 1000)
        )};sort hypes desc; sort first_release_date asc; limit 50;`
      );
      const names = response.data.map((o) => o.name);
      const filtered = response.data.filter(({ name }, index) =>
        name ? !names.includes(name, index + 1) : name
      );
      res.json({ msg: 'ok', filtered });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ err: err.message });
    }
  },
  mostAnticipatedGames: async (req, res) => {
    try {
      const response = await apiConfig(
        '/games',
        `fields name , cover.image_id, screenshots.image_id , videos.video_id , first_release_date , hypes; where hypes > 50; sort first_release_date desc; sort hypes desc; limit 50; `
      );
      const names = response.data.map((o) => o.name);
      const filtered = response.data.filter(({ name }, index) =>
        name ? !names.includes(name, index + 1) : name
      );
      res.json({ msg: 'ok', filtered });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
  getGamesDetails: async (req, res) => {
    try {
      const response = await apiConfig(
        '/games',
        `fields player_perspectives.name, game_modes.name, release_dates.platform.name, age_ratings.content_descriptions.* , alternative_names.name , game_engines.name,  websites.url,name ,themes.name, genres.name, platforms.name, release_dates.date,  hypes, similar_games.name , similar_games.cover.image_id, websites.url , websites.category, involved_companies.company.name, involved_companies.developer,  involved_companies.publisher, involved_companies.supporting,  summary,storyline, videos.video_id,  rating, cover.image_id, first_release_date,artworks.image_id, dlcs, screenshots.image_id,similar_games.name, total_rating ; where id = ${req.params.id};`
      );
      res.json({ msg: 'ok', data: response.data });
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: err.message });
    }
  },
  getJustReleasedGamesPagination: async (req, res) => {
    try {
      const response = await apiConfig(
        '/games',
        `fields id, name, first_release_date,  hypes, cover.image_id ;where first_release_date > ${Math.floor(
          Math.floor((Math.floor(new Date().getTime()) - 86400000 * 14) / 1000)
        )}  & first_release_date <= ${Math.floor(
          Math.floor(new Date().getTime()) / 1000
        )}; sort first_release_date desc; limit 15; offset : ${
          req.params.offset ? req.params.offset : 0
        };`
      );
      return res.json(response.data.splice(0, 10));
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
  getJustComingSoonGamesPagination: async (req, res) => {
    try {
      const response = await apiConfig(
        '/games',
        `fields name , cover.image_id, screenshots.image_id , videos.video_id , first_release_date , hypes; where hypes > 30 & first_release_date > ${Math.floor(
          Math.floor(Date.now() / 1000)
        )};sort hypes desc; sort first_release_date asc; limit 15; offset ${
          req.params.offset ? req.params.offset : 0
        };`
      );
      return res.json(response.data.splice(0, 10));
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
  getMostAnticipatedGamesPagination: async (req, res) => {
    try {
      const response = await apiConfig(
        '/games',
        `fields name , cover.image_id, screenshots.image_id , videos.video_id , first_release_date , hypes; where hypes > 30; sort first_release_date desc; sort hypes desc; limit 15;offset : ${
          req.params.offset ? req.params.offset : 0
        };`
      );
      return res.json(response.data.splice(0, 10));
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
  searchGame: async (req, res) => {
    try {
      const response = await apiConfig(
        '/games',
        `search "${req.params.query}"; fields name, first_release_date, cover.image_id;  limit 10;`
      );
      return res.json(response.data);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
};
module.exports = gamesCtrl;
