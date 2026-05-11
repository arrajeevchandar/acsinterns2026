import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { hash, pathname } = useLocation();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    root.scrollTop = 0;
    document.body.scrollTop = 0;

    if (!hash) {
      const restoreFrame = window.requestAnimationFrame(() => {
        root.style.scrollBehavior = previousScrollBehavior;
      });

      return () => {
        window.cancelAnimationFrame(restoreFrame);
        root.style.scrollBehavior = previousScrollBehavior;
      };
    }

    const hashFrame = window.requestAnimationFrame(() => {
      root.style.scrollBehavior = previousScrollBehavior;
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => {
      window.cancelAnimationFrame(hashFrame);
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [hash, pathname]);

  return null;
}

export default ScrollToTop;
