import React from 'react';

const ProtectedLayout = ({ children }) => {
  return (
    <>
      <h2>protected</h2>

      {children}
    </>
  );
};

export default ProtectedLayout;
