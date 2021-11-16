import React from 'react';
import Link from 'next/link';
import CustomBreak from './customBreak';
const Footer = () => {
  return (
    <div className="footer">
      <span>
        This is personal intellectual product. Please visit{' '}
        <Link href={'/docs'}>
          <a style={{ textDecoration: 'underline' }}>documentation</a>
        </Link>{' '}
        if concerns occurs.
      </span>
      <br />
      <small>
        Developer:{' '}
        <a
          style={{ textDecoration: 'underline' }}
          href="https://github.com/nnguyen52"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jer Ngn
        </a>
      </small>{' '}
      <br />
      <small>Copyright &#169; {`${new Date().getYear() + 1900}`} </small>
    </div>
  );
};

export default Footer;
