// src/context/LoaderContext.js
import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const LoaderContext = createContext(null);

export function useLoader() {
  const ctx = useContext(LoaderContext);
  if (!ctx) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return ctx; // { loading, setLoading }
}

export function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  // Fixes: "The object passed as the value prop ... changes every render"
  const value = useMemo(() => ({ loading, setLoading }), [loading]);

  return (
    <LoaderContext.Provider value={value}>
      {children}
    </LoaderContext.Provider>
  );
}

LoaderProvider.propTypes = {
  // Fixes: "'children' is missing in props validation"
  children: PropTypes.node.isRequired,
};

