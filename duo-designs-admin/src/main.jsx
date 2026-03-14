import React from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from './Root';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Root />);
}
