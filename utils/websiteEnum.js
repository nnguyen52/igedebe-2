import Fb from '../assets/Fb.png';
import android from '../assets/android.png';
import apple from '../assets/apple.png';
import discord from '../assets/discord.png';
import gog from '../assets/gog.png';
import instagram from '../assets/instagram.png';
import official from '../assets/official.png';
import reddit from '../assets/reddit.png';
import steam from '../assets/steam.png';
import twitter from '../assets/twiiter.png';
import twitch from '../assets/twitch.png';
import wiki from '../assets/wiki.png';
import wikia from '../assets/wikia.png';
import youtube from '../assets/youtube.png';
import epic from '../assets/epic.png';
import itch from '../assets/itch.png';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const WebsiteEnums = ({ cate, url }) => {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (!cate) return;
    switch (cate) {
      case 1: {
        setImgSrc(official);
        break;
      }
      case 2: {
        setImgSrc(wikia);
        break;
      }

      case 3: {
        setImgSrc(wiki);
        break;
      }
      case 4: {
        setImgSrc(Fb);
        break;
      }
      case 5: {
        setImgSrc(twitter);
        break;
      }
      case 6: {
        setImgSrc(twitch);
        break;
      }
      case 8: {
        setImgSrc(instagram);
        break;
      }
      case 9: {
        setImgSrc(youtube);
        break;
      }
      case 10: {
        setImgSrc(apple);
        break;
      }
      case 11: {
        setImgSrc(apple);
        break;
      }
      case 12: {
        setImgSrc(android);
        break;
      }
      case 13: {
        setImgSrc(steam);
        break;
      }
      case 14: {
        setImgSrc(reddit);
        break;
      }
      case 15: {
        setImgSrc(itch);
        break;
      }
      case 16: {
        setImgSrc(epic);
        break;
      }
      case 17: {
        setImgSrc(gog);
        break;
      }
      case 18: {
        setImgSrc(discord);
        break;
      }
    }
  }, [cate]);
  if (!cate || !imgSrc) return <> </>;
  return (
    <>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Image
          className="social_media_icon"
          width={40}
          height={40}
          src={imgSrc.src}
          alt="social media"
        />
      </a>
    </>
  );
};
export default WebsiteEnums;
