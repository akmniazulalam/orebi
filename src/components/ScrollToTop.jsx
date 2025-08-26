import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // route change hole top e scroll hobe
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop