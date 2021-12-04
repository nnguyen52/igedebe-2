export const generateImage = (game) => {
  if (game === undefined)
    return `https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpapercave.com%2Fwp%2FnTwzv3B.jpg&f=1&nofb=1`;
  if (game.screenshots)
    return `https://images.igdb.com/igdb/image/upload/t_1080p/${game.screenshots[0].image_id}.jpg`;
  if (game.artworks)
    return `https://images.igdb.com/igdb/image/upload/t_1080p/${game.artworks[0].image_id}.jpg`;
  if (game.videos) return `http://img.youtube.com/vi/${game.videos[0].video_id}/hqdefault.jpg`;
  if (game.cover)
    return `https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.jpg`;
  else
    return `https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpapercave.com%2Fwp%2FnTwzv3B.jpg&f=1&nofb=1`;
};
