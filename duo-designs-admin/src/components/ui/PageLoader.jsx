/** @file PageLoader.jsx */
import React from 'react';

const PageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '64px' }}>
    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', letterSpacing: '2px', color: 'var(--accent)' }}>
      LOADING...
    </div>
  </div>
);

export default PageLoader;
