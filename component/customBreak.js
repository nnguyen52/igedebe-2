import React from 'react';

const CustomBreak = () => {
  return (
    <div
      style={{ color: 'greenyellow', background: 'black', height: '50px', position: 'relative' }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -100%)',
          width: '100%',
          height: '100%',
          margin: '0 auto',
          borderBottom: '3px solid greenyellow',
          maxWidth: '60%',
        }}
      ></div>
    </div>
  );
};

export default CustomBreak;
