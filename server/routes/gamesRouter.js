const router = require('express').Router();
const gamesCtrl = require('../controllers/gamesCtrl');

router.get('/getPre500games', gamesCtrl.getPre500games);

router.post('/justReleasedGames', gamesCtrl.getJustReleasedGames);
router.post('/comingSoonGames', gamesCtrl.comingSoonGames);
router.post('/mostAnticipatedGames', gamesCtrl.mostAnticipatedGames);

router.post('/getGamesDetails/:id', gamesCtrl.getGamesDetails);

router.get('/getJustReleasedGamesPagination/:offset', gamesCtrl.getJustReleasedGamesPagination);
router.get(
  '/getMostAnticipatedGamesPagination/:offset',
  gamesCtrl.getMostAnticipatedGamesPagination
);
router.get('/getJustComingSoonGamesPagination/:offset', gamesCtrl.getJustComingSoonGamesPagination);

router.post('/searchGames/:query', gamesCtrl.searchGame);

module.exports = router;
