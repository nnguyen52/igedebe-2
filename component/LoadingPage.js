import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../assets/loading.json';

const LoadingPage = () => {
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
    </div>
  );
};

export default LoadingPage;
