import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVid from 'lightgallery/plugins/video';
import { useRouter } from 'next/dist/client/router';

const Gallery = ({ screenshots, videos, artworks }) => {
  const [assets, setAssets] = useState([]);
  const router = useRouter();

  const isBrowser = () => typeof window !== 'undefined';
  const [screenSize, getDimension] = useState({
    dynamicWidth: isBrowser() && window?.innerWidth,
    dynamicHeight: isBrowser() && window?.innerHeight,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window?.innerWidth,
      dynamicHeight: window?.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize, isBrowser]);

  useEffect(() => {
    setAssets([]);
  }, [router.query.id]);

  useEffect(() => {
    if (screenshots) {
      setAssets((prevState) => [...prevState, ...screenshots]);
    }
    if (videos) {
      setAssets((prevState) => [...prevState, ...videos]);
    }
    if (artworks) {
      setAssets((prevState) => [...prevState, ...artworks]);
    }
  }, [screenshots, videos, artworks, router.query.id]);

  const LightGallery = dynamic(() => import('lightgallery/react'), {
    ssr: false,
  });
  return (
    <>
      <div className="gallery_custom">
        <LightGallery thumbnail={true} speed={500} plugins={[lgVid, lgThumbnail, lgZoom]}>
          {assets.slice(0, 2).map((image, index) => {
            return (
              <a
                href={
                  image.image_id
                    ? `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${image.image_id}.jpg`
                    : `https://www.youtube.com/watch?v=${image.video_id}`
                }
                key={index}
              >
                <Image
                  className="image_gallery"
                  src={
                    image.image_id
                      ? `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${image.image_id}.jpg`
                      : `http://img.youtube.com/vi/${image.video_id}/hqdefault.jpg`
                  }
                  alt=""
                  width={
                    screenSize.dynamicWidth > 768
                      ? screenSize.dynamicWidth / 3.1
                      : screenSize.dynamicWidth
                  }
                  height={300}
                />
              </a>
            );
          })}
          {assets.length >= 3 && (
            <a
              href={
                assets[2].image_id
                  ? `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${assets[2].image_id}.jpg`
                  : `https://www.youtube.com/watch?v=${assets[2].video_id}`
              }
            >
              <div className="show_more_image_container">
                <div className="show_more_image" style={{ zIndex: '10' }}>
                  <span>+{assets.length - 2}</span>
                </div>
                <Image
                  src={
                    assets[2].image_id
                      ? `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${assets[2].image_id}.jpg`
                      : `http://img.youtube.com/vi/${assets[2].video_id}/hqdefault.jpg`
                  }
                  width={
                    screenSize.dynamicWidth > 768
                      ? screenSize.dynamicWidth / 3
                      : screenSize.dynamicWidth
                  }
                  height={300}
                />
              </div>
            </a>
          )}

          {/* THESE IMAGES ARE HIDDEN, BUT MUST be rendered to feed gallery*/}
          {assets.length >= 4 &&
            assets.slice(3).map((each) => {
              return (
                <a
                  className="image_gallery_hide"
                  href={
                    each.image_id
                      ? `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${each.image_id}.jpg`
                      : `https://www.youtube.com/watch?v=${each.video_id}`
                  }
                  key={each.id}
                >
                  <Image
                    className="image_gallery"
                    src={
                      each.image_id
                        ? `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${each.image_id}.jpg`
                        : `http://img.youtube.com/vi/${each.video_id}/hqdefault.jpg`
                    }
                    width={
                      screenSize.dynamicWidth > 600
                        ? screenSize.dynamicWidth / 3
                        : screenSize.dynamicWidth
                    }
                    height={300}
                  />
                </a>
              );
            })}
        </LightGallery>
      </div>
    </>
  );
};

export default Gallery;
