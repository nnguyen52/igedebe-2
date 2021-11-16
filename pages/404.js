import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../assets/custom404lottie.json';
import Link from 'next/link';
const Notfound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="loading_container">
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        isStopped={false}
        isPaused={false}
      />
      <div
        style={{
          width: '100%',
          maxWidth: '100vw',
        }}
        className="custom404"
      >
        <Link href="/">
          <a>
            <button
              className="btn btn-primary"
              style={{
                textAlign: 'center',
                padding: '20px',
                borderRadius: '50%',
                fontSize: '1.3rem',
                fontWeight: 600,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80px',
                height: '80px',
                margin: '0 auto',
              }}
            >
              Home
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
