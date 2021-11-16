import React from 'react';
import Link from 'next/link';

const CustomButton = ({ content, routing, contentSize }) => {
  return (
    <div className="custom_btn">
      {routing ? (
        <Link href={routing ? routing : ''}>
          <a>
            <div className="border_plus">
              <div className="btn btn-3">
                <span className="deco_top"></span>
                <b style={{ fontSize: contentSize, fontWeight: 'normal' }}> {content} </b>
                <span className="deco_bottom"></span>
              </div>
            </div>
          </a>
        </Link>
      ) : (
        <>
          <div className="border_plus">
            <a className="btn btn-3">
              <span className="deco_top"></span>
              <b style={{ fontSize: contentSize, fontWeight: 'normal' }}> {content} </b>
              <span className="deco_bottom"></span>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomButton;
