import React from 'react';

const docs = () => {
  return (
    <div style={{ color: 'greenyellow', background: 'black', padding: '10px 0 10px 10px' }}>
      <h5
        style={{
          width: 'fit-content',
          padding: '2px 10px',
          margin: 0,
          color: 'black',
          background:
            'linear-gradient(235deg,rgba(115, 242, 28, 1) 0%,rgba(173, 237, 93, 1) 47%,rgba(255, 162, 0, 1) 100%)',
          borderRadius: '10px',
        }}
      >
        Documentation
      </h5>
      <p>
        - This is a personal project made by{' '}
        <a
          style={{ textDecoration: 'underline' }}
          href="https://github.com/nnguyen52"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jer Ngn
        </a>
        . <br />- The project is strongly inspired by{' '}
        <a href="https://www.igdb.com/discover" target="_blank" rel="noopener noreferrer">
          IGDB
        </a>
        .
        <br />- The project is the improved version of{' '}
        <a href="https://igedebe.netlify.com/" target="_blank" rel="noopener noreferrer">
          the previous Igedebe
        </a>
        . <br />- The data is pulled entirely from this{' '}
        <a
          href="https://api-docs.igdb.com/#about"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'underline' }}
        >
          API
        </a>
        . <br />- Any concerns please send me a message via gmail (
        <span style={{ color: 'orange' }}>coh.jr11@gmail.com</span>) with subject as{' '}
        <span style={{ color: 'orange' }}>Igedebe concerns</span>.
      </p>
    </div>
  );
};

export default docs;
