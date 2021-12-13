# Production
### https://igedebe.vercel.app/

### this project used NextJS for frontend, express and IGDB api.
#### NOTE-1: 
this project use Nextjs, i styled CSS by myself so its quite broken (too lazy to set up CSS framework), i dont have time to improve this project so in production there will be crashes in some pags when contents are conditionally rendered (i missed some condition when rendering). 
#### NOTE-2:
im fairly new to NextJS, some prerendered pages can be broken (it stucks at loading page). Furthermore, the original IGDB api allows only 4 requests per second, in Nextjs frontend i prerendered 500 games => every 4 request (1 second), i can prerendered 4 games => then the next requests within 1 second will throw errors. (i dont have time to go back and fix it). This performance make some prerendered page broken (i tried using re-fetching with useEffect but still, quite broken)
